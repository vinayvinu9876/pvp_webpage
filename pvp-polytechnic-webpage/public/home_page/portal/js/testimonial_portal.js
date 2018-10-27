function update_testimonial_data(location_num)
{
  var testimonial_name=document.getElementById('testimonial_name'+location_num).value;
  var testimonial_desc=document.getElementById('testimonial_desc'+location_num).value;
  var testimonial_current_status=document.getElementById('testimonial_status'+location_num).value;
  var testimonial_data=document.getElementById('testimonial_data'+location_num).value;
  console.log(testimonial_arr);
  var testimonial_reference=firebase.database().ref('home/testimonial/'+testimonial_arr[location_num-1][0]);

  testimonial_reference.child('msg').set(testimonial_data);
  testimonial_reference.child('name').set(testimonial_name);
  testimonial_reference.child('desc').set(testimonial_desc);
  testimonial_reference.child('status').set(testimonial_current_status);

}

function update_testimonial_image(location_num)
{
  var testimonial_image_file=document.getElementById('testimonial_image_file'+location_num).files[0];
  var new_testimonial_img_file_name=testimonial_image_file.name;
  var old_testimonial_img_file_name=testimonial_arr[location_num-1][1].img_name;


  if(check_duplicate(testimonial_arr,new_testimonial_img_file_name,1))
  {
    $.notify("Image already exist!\n try changing image name" , 'error');
    return 0;
  }
  var old_testimonial_img_file_ref=firebase.storage().ref('home/testimonial/'+old_testimonial_img_file_name);
  $.notify("Pls wait we are removing the old image",'info');
  upload_testimonial_image_fire(new_testimonial_img_file_name,testimonial_image_file);
  old_testimonial_img_file_ref.delete().then(function(){
    console.log("REmove Complete");
  }).catch(function(error){
      console.log("An error occured "+error.name);
      upload_testimonial_image_fire(new_testimonial_img_file_name,testimonial_image_file);
  });

}
function upload_testimonial_image_fire(new_testimonial_img_file_name,testimonial_image_file)
{
  /*===========================
  UPLOAD TASK
  ===========================*/
      var uploadTask = firebase.storage().ref("home/testimonial/"+new_testimonial_img_file_name).put(testimonial_image_file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      $.notify('Upload is ' + progress + '% done','info');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          $.notify('Upload is paused','warning');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
        $.notify('Upload is running','info');
          break;
      }
    }, function(error) {
      $.notify(" Upload unsuccesfull",'error');
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var  downloadURL = uploadTask.snapshot.downloadURL;

      firebase.database().ref('home/testimonial/'+testimonial_arr[location_num-1][0]).child('img_name').set(new_testimonial_img_file_name);
      firebase.database().ref('home/testimonial/'+testimonial_arr[location_num-1][0]).child('img_url').set(downloadURL);




  });//uploading a new person has been completed

}
