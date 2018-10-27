/*
************Fectching the details of faculty1******
*/

function check_duplicate(arr,file_name,specify)
{
  try{
  for(i=0;i<arr.length;i++)
  {
    if(arr[i][specify].img_name===file_name)
    {
        return true;
    }

  }
  return false;
}
catch(e)
{
  console.log("Cant Check");
  return false;
}
}

var fac_array;
  let DataRef = firebase.database().ref('hostel/hostel_faculty/');
  console.log("About  to initialize Data ");
  DataRef.on("value", function(snap) {

    var data_object=snap.val();
    var num_of_fac=Object.keys(data_object).length;
     fac_array= Object.keys(data_object).map(function(key) {
      return [key, data_object[key]];
    });



    add_fac_elements(num_of_fac);
      write_all_fac_data(num_of_fac,fac_array);

  });
/*Writing faculty1 details to page*/

/*Write of fac1 details to webpage complete vinay*/



function add_fac_elements(num_of_fac)
{
  console.log("function add initialized");

var get_elem=document.getElementById('fac_add');
get_elem.innerHTML="";
  var end_row="</div>";
  console.log("ABOUT to add dynamic elements");

  for(i=1;i<=num_of_fac;i++)
  {
    var add_elem_div="<div class='col-lg-4 col-md-4 col-sm-4' data-scroll-reveal='enter from the bottom after 0.4s'> <div class='faculty-div form-group'> ";
    var add_img_elem="<img src='../images1/default_avatar.png' class='img-rounded width='250' heigth='200' id='fac"+i+"_img'><input type='file' id='fac_image_file"+i+"'><input type='button' class='btn btn-primary' value='upload' onclick='update_fac_img("+i+")'> <h3 id='fac"+i+"_name'>NAME</h3><input type='text' id='fac_name_txt"+i+"' class='form-contro input-sm fac_textbox' onchange='update_faculty_data("+i+")'><hr />";
  var add_design_elem="<h4 id='fac"+i+"_designation'>DESIGNATION</h4><input type='text' class='form-control input-sm fac_textbox' id='fac_designation_text"+i+"' onchange='update_faculty_data("+i+")'><br /><h4 id='fac"+i+"_qualification'>YEARS OF EXPERIENCE</h4><input type='text' class='form-control input-sm fac_textbox' id='fac_qualification_text"+i+"' onchange='update_faculty_data("+i+")'><br /><input type='button' class='btn btn-danger' value='Remove' onclick='remove_fac("+i+")'></div></div> ";

  var add_elem=add_elem_div+add_img_elem+add_design_elem;


    get_elem.innerHTML=get_elem.innerHTML+add_elem;
    if(i%3===0)
    {
      var new_row="<br /><br /><div class='row'>";
      get_elem.innerHTML=get_elem.innerHTML+new_row;
    }
  }
}


function write_all_fac_data(num_of_fac,fac_array)
{

  for(i=1;i<=num_of_fac;i++)
  {

    var img_elem=document.getElementById("fac"+i+"_img");
    var name_txt_box=document.getElementById('fac_name_txt'+i);
    var designation_txt_box=document.getElementById('fac_designation_text'+i);
    var qualification_txt_box=document.getElementById('fac_qualification_text'+i);

    name_txt_box.value=name_elem.innerHTML=fac_array[i-1][1].name;
    designation_txt_box.value=designation_elem.innerHTML=fac_array[i-1][1].designation;
    qualification_txt_box.value=qualification_elem.innerHTML=fac_array[i-1][1].qualification;
    img_elem.src=fac_array[i-1][1].img_url;
    img_elem.width="250";
    img_elem.height="200";


  }

}

function update_faculty_data(location_num)
{
  console.log("I am from update");
  var fac_name=document.getElementById('fac_name_txt'+location_num).value;
  var fac_designation=document.getElementById('fac_designation_text'+location_num).value;
  var fac_qualification=document.getElementById('fac_qualification_text'+location_num).value;
  console.log(fac_name,fac_designation,fac_qualification);
  var fac_fire_ref=firebase.database().ref('hostel/hostel_faculty/'+fac_array[location_num-1][0]+'/');
  fac_fire_ref.child('name').set(fac_name);
  fac_fire_ref.child('designation').set(fac_designation);
  fac_fire_ref.child('qualification').set(fac_qualification);

}
function upload_new_fac()
{

  var new_fac_name=document.getElementById('fac_name_txt');
  var new_fac_designation=document.getElementById('fac_designation_text');
  var new_fac_qualification=document.getElementById('fac_qualification_text');
  try{
    var fac_image_file_ref=document.getElementById('fac_image_file').files[0];

  }catch(e){$.notify("No image file selected",'error');}
  if(check_duplicate(fac_array,fac_image_file_ref.name,1))
  {
    $.notify("The image name is already in use\nChange the image name and try");
    return 0;
  }

  var progress_bar_add=document.getElementById('fac_progress_bar');
  var update_fac_sec=document.getElementById('new_fac_portal');
  /*===========================
  UPLOAD TASK
  ===========================*/
      var uploadTask = firebase.storage().ref("hostel/fac_images/"+fac_image_file_ref.name).put(fac_image_file_ref);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      update_fac_sec.innerHTML="";
      console.log("The progress is "+progress+"% Done");
      progress_bar_add.innerHTML='<br /><br /><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar"  aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%" id="progress_bar">  Complete </div></div><h4><center>Uploading</center></h4>';
      var p_bar=document.getElementById('fac_progress_bar');
      p_bar.innerHTML=p_bar.innerHTML+Math.round(progress)+"%";

      p_bar.style.width=progress+"%";
      p_bar.innerHTML=Math.round(progress)+"% Complete";
      if(progress===100)
      {
        p_bar.innerHTML="Success";
        progress_bar_add.innerHTML="";
        update_fac_sec.innerHTML="<div class='col-lg-4 col-md-4 col-sm-4' data-scroll-reveal='enter from the bottom after 0.4s'><div class='faculty-div form-group'><img src='../images1/default_avatar.png' class='img-rounded' width='250' heigth='200' id='fac_img'><input type='file' id='fac_image_file' onchange='preview_image()'><h3 id='fac_name'> Name</h3><hr /><input type='text' id='fac_name_txt' class='form-control input-sm fac_textbox' value='name' ><h4 id='fac_designation'>DESIGNATION</h4><input type='text' class='form-control input-sm fac_textbox' id='fac_designation_text' value='DESIGNATION' ><br /><h4 id='fac_qualification'>YEARS OF EXPERIENCE</h4><input type='text' class='form-control input-sm fac_textbox' id='fac_qualification_text' value='YEARS OF EXPERIENCE' ><br /><input type='button' class='btn btn-primary' value='Update' onclick='upload_new_fac()'></div></div>";
          $.notify("Upload Complete ",'success');

      }
      console.log("The upload is "+progress+"% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      console.log(" Upload unsuccesfull");

      $.notify("Upload Incomplete", 'error' );
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var  downloadURL = uploadTask.snapshot.downloadURL;

       var facData = {
     name : new_fac_name.value,
      designation  : new_fac_designation.value,
     qualification : new_fac_qualification.value,
      img_url : downloadURL,
      img_name : fac_image_file_ref.name
   };

   // Get a key for a new Post.
   var newPostKey = firebase.database().ref('hostel/hostel_faculty/').child('posts').push().key;

   // Write the new post's data simultaneously in the posts list and the user's post list.
   var updates = {};
   updates['hostel/hostel_faculty/'+ newPostKey] = facData;

   console.log("The data has been uploaded");
   new_fac_name.value="name";
   new_fac_designation.value="designation";
   new_fac_qualification.value="YEARS OF EXPERIENCE";
   return firebase.database().ref().update(updates);
    });//uploading a list has been completed

}

function remove_fac(location_num)
{
  $.notify("Please Dont refresh or close the page\nwe are removing the faculty data",'info');
  console.log("About remove Data");
  var remove_ref=firebase.storage().ref('yoga/fac_images/'+fac_array[location_num-1][1].img_name);
  remove_ref.delete().then(function(){
    firebase.database().ref('yoga/yoga_faculty/'+fac_array[location_num-1][0]).remove();


      $.notify("Remove succesfull", 'success');

  }).catch(function(error){
      $.notify("Remove Failed\n"+error.name,'error');
  });

}

function update_fac_img(location_num)
{
  var fac_img_file=document.getElementById('fac_image_file'+location_num).files[0];

  if(check_duplicate(fac_array,fac_img_file.name,1))
  {
    $.notify("The image name is already in use\nPls try an differnent image file name");
    return 0;
  }

  firebase.storage().ref('hostel/fac_images/'+fac_array[location_num-1][1].img_name).delete().then(function(){

      $.notify("Remove succesfull", 'info');
      upload_fac_image_fire(fac_img_file,location_num);


  }).catch(function(error){
    console.log("Remove Failed\n"+error.name);
    upload_fac_image_fire(fac_img_file,location_num);
  });

}

function upload_fac_image_fire(fac_img_file,location_num)
{
  console.log("Uploading fac image");
  var uploadTask=firebase.storage().ref("hostel/fac_images/"+fac_img_file.name).put(fac_img_file);

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

     firebase.database().ref('hostel/hostel_faculty/'+fac_array[location_num-1][0]+'/img_url').set(downloadURL);
     firebase.database().ref('hostel/hostel_faculty/'+fac_array[location_num-1][0]+'/img_name').set(fac_img_file.name);
  });//uploading a list has been completed

}
