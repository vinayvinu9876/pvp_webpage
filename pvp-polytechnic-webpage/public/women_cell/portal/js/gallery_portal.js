function add_portal_cont(elem_id)
{
      var  gal_img_div=document.getElementById(elem_id);
      gal_img_div.innerHTML=gal_img_div.innerHTML+"<input  type='button' class='btn btn-danger' value='Remove' onclick='remove_gal_img("+i+")'><hr />";
      console.log(gal_img_div.innerHTML);
}
function remove_gal_img(location_num)
{
  $.notify("Removing image");
    var rm_img_name=gallery_url_arr[no_of_img-location_num][1].img_name;
    firebase.storage().ref('womens_cell/gallery/'+rm_img_name).delete().then(function(){
      firebase.database().ref('womens_cell/gallery/'+gallery_url_arr[no_of_img-location_num][0]).remove();


        $.notify("Remove succesfull", 'success');



    }).catch(function(error){
        $.notify("Remove Failed\n"+error.name,'error');
    });
}

function  add_new_gal_img()
{
  var img_file=document.getElementById('new_img_file').files[0];
  if(check_duplicate(gallery_url_arr,img_file.name,1))
  {
    $.notify("The image name is already in use Pls try differnent image name");
    return 0;
  }

  var uploadTask=firebase.storage().ref("womens_cell/gallery/"+img_file.name).put(img_file);

    $.notify("Uploading faculty image",'info');
    uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    console.log("The progress is "+progress+"% Done");
    $.notify("Upload is "+progress+"% done",'info');

    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        $.notify("Upload is paused",'warning');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        $.notify("Upload is running",'info');
        break;
    }
  }, function(error) {
    $.notify("Upload unsuccesfull "+error.name+"\n Please retry");
    console.log(" Upload unsuccesfull\n"+error.name);
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    var  downloadURL = uploadTask.snapshot.downloadURL;

    var imageData = {
    img_name : img_file.name,
    img_url : downloadURL
    };


    // Get a key for a new Post.
    var newPostKey = firebase.database().ref('womens_cell/gallery/').child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/womens_cell/gallery/'+ newPostKey] = imageData;

    console.log("The data has been uploaded");
    return firebase.database().ref().update(updates);
  });
}
