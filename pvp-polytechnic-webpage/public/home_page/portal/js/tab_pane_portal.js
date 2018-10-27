/*===========================================
NEWS PORTAL
============================================*/

function edit_tab_pane_portal(name,portal_id)
{
  console.log(name);
var desc_elem=name+"_desc";
var img_elem=name+'_img_file';
var date_elem=name+'_date';
var  portal_html='<h3>Add '+name+'</h3><textarea class="wp-form-control wpcf7-textarea" cols="15" rows="5" placeholder="Enter '+name+' Description" id='+desc_elem+' style="border:1px solid" autofocus></textarea><br /><br /><input type="date" placeholder="Date" id='+date_elem+' class="form-control input-lg"><br /><br /><label>Choose Image File</label><input type="file" id='+img_elem+' accept="image/jpeg,image/jpg,image/jpe,image/png,image/gif,image/webp,image/bmp,image/tiff" ref="input"><br /><br /><input type="button" class="btn btn-primary" id="add_'+name+'_btn" onclick="add_fire_Data('+desc_elem+','+date_elem+','+img_elem+','+String(name)+');"  value="Add '+name+'">';
console.log(portal_html);
var add_to_portal=document.getElementById(portal_id);
add_to_portal.innerHTML=portal_html;

}





function add_fire_Data(desc,add_date,img_file_elem,name)
{


    var list_desc=desc.value;
    var list_date=new Date(add_date.value).toLocaleDateString();
    var img_file=img_file_elem.files[0];
    var img_file_name=img_file.name;


    var list_database_ref=firebase.database().ref("home/"+String(name.id)+"/");
    var progress_bar_add=document.getElementById('add_'+name.id+'_portal');
    var add_btn=document.getElementById('add_'+name.id+'_btn').style;




/*===========================
UPLOAD TASK
===========================*/
    var uploadTask = firebase.storage().ref("home/"+String(name.id)+"_images/"+img_file_name).put(img_file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    add_btn.visibility="hidden";
    console.log("The progress is "+progress+"% Done");
    progress_bar_add.innerHTML='<br /><br /><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar"  aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%" id="progress_bar">  Complete </div></div><h4><center>Uploading</center></h4>';
    var p_bar=document.getElementById('progress_bar');
    p_bar.innerHTML=p_bar.innerHTML+Math.round(progress)+"%";

    p_bar.style.width=progress+"%";
    p_bar.innerHTML=Math.round(progress)+"% Complete";
    if(progress===100)
    {
      p_bar.innerHTML="Success";
      progress_bar_add.innerHTML="";
      add_btn.visibility="visible";
        $.notify("Upload Complete ",'success');
    }
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        alert('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    alert(" Upload unsuccesfull");
    document.getElementById('progress_bar').innerHTML="UnSuccessfull";
    progress_bar_add.innerHTML="";
    add_btn.visibility="visible";
    $.notify("Upload Incomplete", 'error' );
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    var  downloadURL = uploadTask.snapshot.downloadURL;

     var listData = {
   description : list_desc,
    date  : list_date,
   img_name : img_file_name,
    img_url : downloadURL
 };

 // Get a key for a new Post.
 var newPostKey = list_database_ref.child('posts').push().key;

 // Write the new post's data simultaneously in the posts list and the user's post list.
 var updates = {};
 updates['/home/'+name.id+'/'+ newPostKey] = listData;

 console.log("The data has been uploaded");
 return firebase.database().ref().update(updates);
  });//uploading a list has been completed



}

/*================================
REMOVE LIST function
================================*/
function remove_list(location_num,name)
{
  var ListArray;
  var no_of_elem;
  var check_array;
  if(name.id==='news')
  {
      ListArray=news_array;
      no_of_elem=no_of_news;

  }
  else if(name.id==='notice')
  {
    ListArray=notice_array;
    no_of_elem=no_of_notice;

  }
  else if(name.id==='events')
  {
    ListArray=events_array;
    no_of_elem=no_of_events;

  }
  else {
    $(".tab-content").notify("Remove Failed", 'error');
    return 0;
  }

  var list_db_ref=firebase.database().ref('home/'+name.id+'/'+ListArray[no_of_elem-location_num][1]);
  list_db_ref.remove();

if(!check_duplicate(ListArray,ListArray[no_of_elem-location_num][0].img_name,0))
{
var remove_ref=firebase.storage().ref('home/'+name.id+"_images/"+ListArray[no_of_elem-location_num][0].img_name);
remove_ref.delete().then(function(){

    $.notify("Remove succesfull", 'info');
}).catch(function(error){
  console.log("Remove Failed\n"+error.name);
});
}

}
