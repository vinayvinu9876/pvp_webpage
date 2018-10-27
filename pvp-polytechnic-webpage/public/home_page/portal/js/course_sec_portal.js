
function change_hod_name(course_id,new_hod_name)
{
  try{
    firebase.database().ref('home/courses/course'+course_id+'/c_hod').set(new_hod_name);
  }
  catch(e)
  {
    console.log('An error occured '+e);
  };
}

function upload_hod_image(file_elem_id,course_id)
{
  try{
  var new_hod_img=document.getElementById(file_elem_id).files[0];
}
catch(e)
{
  $.notify("No image Selected \n or\n image file error");
}

if(check_duplicate(course_arr,new_hod_img.name,1)){
  $.notify("Image file already Exist in the network\nTry Renaming the file");
  return 0;
}
  firebase.storage().ref('home/courses/hod_image/'+course_arr[course_id-1][1].img_name).delete().then(function(){

      $.notify("Remove succesfull", 'info');
      upload_hod_image_fire(new_hod_img,course_id);


  }).catch(function(error){
    console.log("Remove Failed\n"+error.name);
    upload_hod_image_fire(new_hod_img,course_id);
  });

}

function upload_hod_image_fire(new_hod_img,course_id)
{
  console.log("Uploading hod image");
  var uploadTask=firebase.storage().ref("home/courses/hod_image/"+new_hod_img.name).put(new_hod_img);


  var progress_bar_add1=document.getElementById('c_portal'+course_id);
      progress_bar_add1.innerHTML="<h4>Removing Old image pls wait..</h4>";

  uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    console.log("The progress is "+progress+"% Done");
    progress_bar_add1.innerHTML='<br /><br /><div class="progress" id="p_bar_div"><div class="progress-bar progress-bar-striped active" role="progressbar"  aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%" id="progress_bar1">  Complete </div></div><h4><center>Uploading</center></h4>';
    var p_bar1=document.getElementById('progress_bar1');
    p_bar1.innerHTML=p_bar1.innerHTML+Math.round(progress)+"%";

    p_bar1.style.width=progress+"%";
    p_bar1.innerHTML=Math.round(progress)+"% Complete";
    if(progress===100)
    {
      p_bar1.innerHTML="Success";
      progress_bar_add1.innerHTML="";


        $.notify("Upload Complete ",'success');
    }

    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    console.log(" Upload unsuccesfull\n"+error.name);
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    var  downloadURL = uploadTask.snapshot.downloadURL;

     firebase.database().ref('home/courses/course'+course_id+'/hod_img_url').set(downloadURL);
     firebase.database().ref('home/courses/course'+course_id+'/img_name').set(new_hod_img.name);
  });//uploading a list has been completed

}
