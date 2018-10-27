var no_of_img;
var img_url_arr;
var gallery_img_ref=firebase.database().ref('home/gallery/');



  gallery_img_ref.on('value',function(snap){
try{
  var img_url_obj=snap.val();

  no_of_img=Object.keys(img_url_obj).length;

  img_url_arr=Object.keys(img_url_obj).map(function(key){
    return [key,img_url_obj[key]];
  });
  console.log(img_url_arr);
  create_img_sec();
}

catch(e)
{
  console.log("No images");
  no_of_img=0;
  document.getElementById('gallerySLide').innerHTML="<center><h1>No image to display</h1></center>";
}


});



function create_img_sec()
{
  console.log("Creating img_elements");
  var gallery_area=document.getElementById('gallerySLide');
  var tot_html="";
  gallery_area.innerHTML="";

for(i=1;i<=no_of_img;i++)
  {

    console.log("i========"+i);

    var img_html="<a href='img/gallery/img-large1.jpg' title='This is title' id='img_href"+i+"'><br /><br /><img class='gallery_img' src='img/gallery/img-small1.jpg' alt='img' id='g_img"+i+"'/><br /></a><a><input type='button' value='Remove' class='btn btn-danger' onclick='remove_gallery_img("+i+")'></a>";
    gallery_area.innerHTML=gallery_area.innerHTML+img_html;
    tot_html=tot_html+img_html;

}


write_img();

}

function write_img()
{
  for(i=1;i<=no_of_img;i++)
  {
    var href_elem=document.getElementById("img_href"+i);
    var img_elem=document.getElementById('g_img'+i);
    console.log("i==="+i);

    href_elem.href=img_url_arr[no_of_img-i][1].url;
    img_elem.src=img_url_arr[no_of_img-i][1].url;
  }
}



function add_gallery_image()
{
  try{var img_file=document.getElementById('new_gallery_img').files[0];var img_file_name=img_file.name;}
  catch(e){$.notify('no image selected','error');return 0;}

  try{
if(check_duplicate(img_url_arr,img_file_name,1))
{
  $.notify("Image already exist!\n try changing image name" , 'error');
  return 0;
}
}
catch(e)
{
  console.log("No images but good codition");
}
  var progress_bar_add2=document.getElementById('gallery_portal_p_div');


  /*===========================
  UPLOAD TASK
  ===========================*/
      var uploadTask = firebase.storage().ref("home/gallery/"+img_file_name).put(img_file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log("The progress is "+progress+"% Done");
      progress_bar_add2.innerHTML='<br /><br /><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar"  aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%" id="progress_bar">  Complete </div></div><h4><center>Uploading  '+img_file_name+'</center></h4>';
      var p_bar=document.getElementById('progress_bar');
      p_bar.innerHTML=p_bar.innerHTML+Math.round(progress)+"%";

      p_bar.style.width=progress+"%";
      p_bar.innerHTML=Math.round(progress)+"% Complete";
      if(progress===100)
      {
        p_bar.innerHTML="Success";
        progress_bar_add2.innerHTML="";

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
      p_bar.innerHTML="UnSuccessfull";
      progress_bar_add2.innerHTML="";
      $.notify(" Upload unsuccesfull",'error');
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var  downloadURL = uploadTask.snapshot.downloadURL;

       var imgData = {
      img_name : img_file_name,
        url : downloadURL
   };

   // Get a key for a new Post.
   var newPostKey = firebase.database().ref('home/gallery/').child('posts').push().key;

   // Write the new post's data simultaneously in the posts list and the user's post list.
   var updates = {};
   updates['/home/gallery/'+ newPostKey] = imgData;

   console.log("The data has been uploaded");
   return firebase.database().ref().update(updates);
    });
}


function remove_gallery_img(location_num)
{

  var img_name=img_url_arr[no_of_img-location_num][1].img_name;
  var db_img_key=img_url_arr[no_of_img-location_num][0];

  firebase.database().ref('home/gallery/'+db_img_key).remove();
    var progress_bar_add2=document.getElementById('gallery_portal_p_div');
    progress_bar_add2.innerHTML="<br /><div class='alert alert-warning'><center>Removing  image</center></div>";

  var remove_ref=firebase.storage().ref('home/gallery/'+img_name);
  remove_ref.delete().then(function(){
      $.notify("Remove successful",'error');
      progress_bar_add2.innerHTML="";
  }).catch(function(error){
    console.log("Remove Failed\n"+error.name);
    $.notify("Remove failed \n"+error.name);
  });
}
