var management_ref=firebase.database().ref('home/management');
var no_of_persons;
var management_arr;


function getScreenSize()
{
  var $temp =  $('<div style="overflow:hidden;visibility:hidden;width:10in"/>').appendTo('body'),
       dpi = $temp[0].offsetWidth / 10;
    return screen.width / dpi + 'x' + screen.height / dpi;
}

console.log("\n\n\n\nI am from management JS");

management_ref.on('value',function(snap){

try{
  var management_obj=snap.val();

  no_of_persons=Object.keys(management_obj).length;

  management_arr=Object.keys(management_obj).map(function(key){
    return [key,management_obj[key]];
  });
  console.log("I am management_arr");
  console.log(management_arr);
  create_management_sec();
  write_management_sec();
}
catch(e)
{
  console.log("No Data");
  document.getElementById('add_management').innerHTML="<center><h1>NO Data</h1></center>";
}
});

function create_management_sec()
{
  var  management_elem=document.getElementById('add_management');
  management_elem.innerHTML="";
  for(i=1;i<=no_of_persons;i++)
  {
    var person_html="<div class='col-sm-3 col-xs-12 form-group'><div class='card card-block'><img alt='' class='team-img' src='img/author.jpg' id='p_img"+i+"'><br /><input type='file' id='portal_m_img"+i+"'><br /><input type='button' class='btn btn-primary' value='Upload image' onclick='upload_new_img("+i+")'><div class='card-title-wrap'><span class='card-title'>Name</span><input type='text' class='form-control' id='portal_p_name"+i+"' onchange='update_old_person("+i+")'><span class='card-title'>Qualification</span><input type='text' class='form-control' id='portal_p_qualification"+i+"' onchange='update_old_person("+i+")'><span class='card-title' >Position</span><input type='text' class='form-control' id='portal_p_position"+i+"' onchange='update_old_person("+i+")'> <span class='card-title'>Designation</span><input type='text' class='form-control' id='portal_p_designation"+i+"' onchange='update_old_person("+i+")'></div><input type='button' class='btn btn-danger' value='Remove'  onclick='remove_person("+i+")'></div></div>";
    management_elem.innerHTML=management_elem.innerHTML+person_html;
    if(i%4==0)
    {
      var end_row="</div>";
      var add_row="<div class='row'>";
      management_elem.innerHTML=management_elem.innerHTML+end_row+add_row;
    }
  }
  management_elem.innerHTML=management_elem.innerHTML+"</div>";
}


function write_management_sec()
{

  for(i=0;i<no_of_persons;i++)
  {
    var p_img_ref=document.getElementById('p_img'+(i+1));


    var portal_p_designation=document.getElementById('portal_p_designation'+(i+1));
    var portal_p_name=document.getElementById('portal_p_name'+(i+1));
    var portal_p_qualification=document.getElementById('portal_p_qualification'+(i+1));
    var portal_p_position=document.getElementById('portal_p_position'+(i+1));


    p_img_ref.src=management_arr[i][1].img_url;
    portal_p_name.value=management_arr[i][1].name;
    portal_p_designation.value=management_arr[i][1].designation;
    portal_p_position.value=management_arr[i][1].position;
    portal_p_qualification.value=management_arr[i][1].qualification;
  }

}


function upload_new_person()
{
  try{
  var new_person_name=document.getElementById('new_person_name');
  var new_person_designation=document.getElementById('new_person_designation');
  var new_person_qualification=document.getElementById('new_person_qualification');
  var new_person_position=document.getElementById('new_person_position');
  var img_file=document.getElementById('new_person_image').files[0];
  var img_file_name=img_file.name;
}
catch(e){$.notify("An Value is Missing",'error');return 0;}

  try{
if(check_duplicate(management_arr,img_file_name,1))
{
  $.notify("Image already exist!\n try changing image name" , 'error');
  return 0;
}
}
catch(e)
{
  console.log("No images good codition");
}
var progress_bar_add3=document.getElementById('management_p_portal');
  /*===========================
  UPLOAD TASK
  ===========================*/
      var uploadTask = firebase.storage().ref("home/management/"+img_file_name).put(img_file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log("The progress is "+progress+"% Done");
      progress_bar_add3.innerHTML='<br /><br /><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar"  aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%" id="progress_bar">  Complete </div></div><h4><center>Uploading  '+new_person_name.value+'</center></h4>';
      var p_bar=document.getElementById('progress_bar');
      p_bar.innerHTML=p_bar.innerHTML+Math.round(progress)+"%";

      p_bar.style.width=progress+"%";
      p_bar.innerHTML=Math.round(progress)+"% Complete";
      if(progress===100)
      {
        p_bar.innerHTML="Success";
        progress_bar_add3.innerHTML="";

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
      $.notify(" Upload unsuccesfull",'error');
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var  downloadURL = uploadTask.snapshot.downloadURL;

       var personData = {
     designation : new_person_designation.value,
      name  : new_person_name.value,
      position : new_person_position.value,
      qualification : new_person_qualification.value,
     img_name : img_file_name,
      img_url : downloadURL
   };


   new_person_designation.value=null;
  new_person_name.value=null;
  new_person_position.value=null;
  new_person_qualification.value=null;
  document.getElementById('output_pers_img').src="../images1/default_avatar.png";




   // Get a key for a new Post.
   var newPostKey = firebase.database().ref('home/management/').child('posts').push().key;

   // Write the new post's data simultaneously in the posts list and the user's post list.
   var updates = {};
   updates['/home/management/'+ newPostKey] = personData;

   console.log("The data has been uploaded");
   return firebase.database().ref().update(updates);
 });//uploading a new person has been completed

}

function remove_person(location_num)
{
  console.log("At remove function");
  var management_ref_portal=firebase.database().ref('home/management/'+management_arr[location_num-1][0]).remove();
  var management_storage_ref=firebase.storage().ref('home/management/'+management_arr[location_num-1][1].img_name);

  management_storage_ref.delete().then(function(){
    $.notify("Remove Complete",'success');
  }).catch(function(error){
      console.log("An error occured "+error.name);
      $.notify("Upload unsuccesfull","error");
  });

}

function update_old_person(location_num)
{
  var designation_to_update=document.getElementById('portal_p_designation'+location_num).value;
  var name_to_update=document.getElementById('portal_p_name'+location_num).value;
  var qualification_to_update=document.getElementById('portal_p_qualification'+location_num).value;
  var position_to_update=document.getElementById('portal_p_position'+location_num).value;
  var person_db_ref=firebase.database().ref('home/management/'+management_arr[location_num-1][0]);
  person_db_ref.child('designation').set(designation_to_update);
  person_db_ref.child('name').set(name_to_update);
  person_db_ref.child('position').set(position_to_update);
  person_db_ref.child('qualification').set(qualification_to_update);
}

function upload_new_img(location_num)
{
  try{
  var new_image_file=document.getElementById('portal_m_img'+location_num).files[0];
  if(check_duplicate(management_arr,new_image_file.name,1))
  {
  $.notify("Image already exist!\n try changing image name" , 'error');
  return 0;
  }

}
catch(e)
{
  $.notify("No file has been choosen \n or \n image file may  exist in the network",'error');
  return 0;
}


var old_image_file_name=management_arr[location_num-1][1].img_name;
  var new_image_file_name=new_image_file.name;

  var old_image_storage_ref=firebase.storage().ref('home/management/'+old_image_file_name);
  $.notify("PLs wait we are removing the Old image","info");
  old_image_storage_ref.delete().then(function(){
    console.log("REmove Complete");

    update_old_image_fire(new_image_file_name,new_image_file);
  }).catch(function(error){
      console.log("An error occured "+error.name);
      update_old_image_fire(new_image_file_name,new_image_file);
  });




}

function update_old_image_fire(new_image_file_name,new_image_file)
{
  /*===========================
  UPLOAD TASK
  ===========================*/
      var uploadTask = firebase.storage().ref("home/management/"+new_image_file_name).put(new_image_file);

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
          $.notify('Upload is paused','info');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          $.notify('Upload is running','info');
          break;
      }
    }, function(error) {
        $.notify(" Upload unsuccesfull","error");
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var  downloadURL = uploadTask.snapshot.downloadURL;

      firebase.database().ref('home/management/'+management_arr[1][0]).child('img_name').set(new_image_file_name);
      firebase.database().ref('home/management/'+management_arr[1][0]).child('img_url').set(downloadURL);




  });//uploading a new person has been completed
}
