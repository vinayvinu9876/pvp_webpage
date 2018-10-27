function user_add_posts_edit()
{
  var div_html="<div class='row set-row-pad'><div class='col-lg-4 col-md-4 col-sm-4'></div><div class='col-lg-8 col-md-8 col-sm-8' data-scroll-reveal='enter from the bottom after 0.4s'><center><h2>Add new Post</h2><hr /><input type='file' id='post_img_file'><textarea class='form-control' rows='10' cols='20' id='post_desc_txt' placeholder='Description'></textarea></center><br /><input type='button' class='btn btn-primary btn-block' value='Add Post' onclick='add_new_post()'></div></div>";

  document.getElementById('post_div').innerHTML=document.getElementById('post_div').innerHTML+div_html;
}
function user_remove_posts_edit(location_num)
{
    var post_sec=document.getElementById('posts'+location_num);
    post_sec.innerHTML=post_sec.innerHTML+"<input type='button' class='btn btn-danger' value='Remove' onclick='remove_post("+location_num+")'> ";
}
function add_new_post()
{
  var post_image_file=document.getElementById('post_img_file').files[0];
  var post_desc=document.getElementById('post_desc_txt').value;

  if(check_duplicate(post_data_array,post_image_file.name,1))
  {
    $.notify("The image name is already in use Pls try differnent image name");
    return 0;
  }

  var uploadTask=firebase.storage().ref("sports/dept_highlights/posts/"+post_image_file.name).put(post_image_file);

    $.notify("Uploading Post image",'info');
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

    var postData = {
    description : post_desc,
    img_url : downloadURL,
    img_name : post_image_file.name
    };


    // Get a key for a new Post.
    var newPostKey = firebase.database().ref('me/dept_high_lights/posts/').child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['sports/dept_high_lights/posts/'+ newPostKey] = postData;

    console.log("The data has been uploaded");
    return firebase.database().ref().update(updates);
  });//uploading a list has been completed
}


function remove_post(location_num)
{
  $.notify("Removing posts",'info');
  var post_ref=firebase.database().ref('sports/dept_high_lights/posts/'+post_data_array[location_num-1][0]);
  var post_storage_ref=firebase.storage().ref('sports/dept_highlights/posts/'+post_data_array[location_num-1][1].img_name);

  post_storage_ref.delete().then(function(){
    post_ref.remove();


      $.notify("Remove succesfull", 'success');

  }).catch(function(error){
      $.notify("Remove Failed\n"+error.name,'error');
  });
}

function add_notice_and_evt_textbox()
{
  var evt_sec=document.getElementById('evt_list');
  var notice_sec=document.getElementById('notice_list');

  evt_sec.innerHTML=evt_sec.innerHTML+"<input type='text' class='form-control' id='evt_textbox' placeholder='Write Event'><input type='button' class='btn btn-primary' value='Add event' onclick='add_events()'> ";
  notice_sec.innerHTML=notice_sec.innerHTML+"<input type='text' class='form-control' id='notice_textbox' placeholder='Write Notice'><input type='button' class='btn btn-primary' value='Add notice' onclick='add_notice()'>";
}
function add_notice()
{
  var data_value=document.getElementById('notice_textbox');

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref('sports/dept_high_lights/notice/').child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/sports/dept_high_lights/notice/'+ newPostKey] =data_value.value;
  data_value.value="";

  console.log("The data has been uploaded");
  return firebase.database().ref().update(updates);
}


function add_events()
{
  var data_value=document.getElementById('evt_textbox');

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref('sports/dept_high_lights/events/').child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/sports/dept_high_lights/events/'+ newPostKey] =data_value.value;
  data_value.value="";

  console.log("The data has been uploaded");
  return firebase.database().ref().update(updates);
}


function evt_list_edit_remove(list_elem,location_num)
{
    var elem=document.getElementById(list_elem);
    elem.innerHTML=elem.innerHTML+"<input type='button' class='brtn btn-danger' value='Remove' onclick='remove_evt_list("+location_num+")'>";
}

function notice_list_edit_remove(list_elem,location_num)
{
  var elem=document.getElementById(list_elem);
  elem.innerHTML=elem.innerHTML+"<input type='button' class='brtn btn-danger' value='Remove' onclick='remove_notice_list("+location_num+")'>";
}


function remove_notice_list(location_num)
{
  console.log("location num"+location_num);
  console.log("no_of_notice"+notice_arr.length);
  console.log(notice_arr.length-location_num);
    firebase.database().ref('sports/dept_high_lights/notice/'+notice_arr[notice_arr.length-location_num][0]).remove();
}
function remove_evt_list(location_num)
{
  firebase.database().ref('sports/dept_high_lights/events/'+events_arr[events_arr.length-location_num][0]).remove();
}
