/*================================================
NON TEACHING STAFF DATA FETCH function
=================================================*/

var non_t_fac_array;
  let NonTeachingDataRef = firebase.database().ref('AT/AT_faculty/non_teaching/');
  console.log("About  to initialize Data ");
  NonTeachingDataRef.on("value", function(snap) {

    var data_object=snap.val();
    var num_of_fac=Object.keys(data_object).length;
     non_t_fac_array= Object.keys(data_object).map(function(key) {
      return [key, data_object[key]];
    });



    add_non_fac_elements(num_of_fac);
      write_all_non_fac_data(num_of_fac,non_t_fac_array);

  });

  function add_non_fac_elements(num_of_fac)
  {
    console.log("function add initialized");

  var get_elem=document.getElementById('non_fac_add');
  get_elem.innerHTML="<center><h2>TECHNICAL STAFF</h2></center>";
    var end_row="</div>";
    console.log("ABOUT to add dynamic elements");

    for(i=1;i<=num_of_fac;i++)
    {
      var add_elem_div="<div class='col-lg-4 col-md-4 col-sm-4' data-scroll-reveal='enter from the bottom after 0.4s'> <div class='faculty-div form-group'> ";
      var add_img_elem="<img src='../images1/default_avatar.png' class='img-rounded width='250' heigth='250' id='non_fac"+i+"_img'><input type='file' id='non_fac_image_file"+i+"'><input type='button' class='btn btn-primary' value='upload' onclick='update_non_fac_img("+i+")'> <h3 id='non_fac"+i+"_name'>NAME</h3><input type='text' id='non_fac_name_txt"+i+"' class='form-contro input-sm fac_textbox' onchange='update_non_faculty_data("+i+")'><hr />";
var add_qualification_elem="<h4>QUALIFICATION</h4><input type='text' class='form-control input-sm fac_textbox' id='non_fac_qualification_text"+i+"'><br />";
    var add_design_elem="<h4 id='non_fac"+i+"_designation'>DESIGNATION</h4><input type='text' class='form-control input-sm fac_textbox' id='non_fac_designation_text"+i+"' ><br /><h4 id='non_fac"+i+"_years_of_exp'>YEARS OF EXPERIENCE</h4><input type='text' class='form-control input-sm fac_textbox' id='non_fac_years_of_exp_text"+i+"' onchange='update_non_faculty_data("+i+")'><br /><input type='button' class='btn btn-danger' value='Remove' onclick='remove_non_fac("+i+")'></div></div> ";

    var add_elem=add_elem_div+add_img_elem+add_qualification_elem+add_design_elem;


      get_elem.innerHTML=get_elem.innerHTML+add_elem;
      if(i%3===0)
      {
        var new_row="<br /><br /><div class='row'>";
        get_elem.innerHTML=get_elem.innerHTML+new_row;
      }
    }
  }




  function write_all_non_fac_data(num_of_fac,fac_array)
  {

    for(i=1;i<=num_of_fac;i++)
    {

      var img_elem=document.getElementById("non_fac"+i+"_img");
      var name_txt_box=document.getElementById('non_fac_name_txt'+i);
      var qualification_txt_box=document.getElementById('non_fac_qualification_text'+i);
      var designation_txt_box=document.getElementById('non_fac_designation_text'+i);
      var exp_txt_box=document.getElementById('non_fac_years_of_exp_text'+i);

      name_txt_box.value=fac_array[i-1][1].name;
      qualification_txt_box.value=fac_array[i-1][1].qualification;
      designation_txt_box.value=fac_array[i-1][1].designation;
      exp_txt_box.value=fac_array[i-1][1].date_of_joining;
      img_elem.src=fac_array[i-1][1].img_url;
      img_elem.width="250";
      img_elem.height="250";


    }

  }



  function update_non_faculty_data(location_num)
  {
    console.log("I am from update");
    var non_fac_name=document.getElementById('non_fac_name_txt'+location_num).value;
    var non_fac_qualification=document.getElementById('non_fac_qualification_text'+location_num).value;
    var non_fac_designation=document.getElementById('non_fac_designation_text'+location_num).value;
    var non_fac_exp=document.getElementById('non_fac_years_of_exp_text'+location_num).value;

    var non_fac_fire_ref=firebase.database().ref('AT/AT_faculty/non_teaching/'+non_t_fac_array[location_num-1][0]+'/');
    non_fac_fire_ref.child('name').set(non_fac_name);
    non_fac_fire_ref.child('qualification').set(non_fac_qualification);
    non_fac_fire_ref.child('designation').set(non_fac_designation);
    non_fac_fire_ref.child('date_of_joining').set(non_fac_exp);

  }






  function upload_new_non_fac()
  {

    var new_non_fac_name=document.getElementById('non_fac_name_txt');
    var new_non_fac_qualification=document.getElementById('non_fac_qualification_text');
    var new_non_fac_designation=document.getElementById('non_fac_designation_text');
    var new_non_fac_exp=document.getElementById('non_fac_years_of_exp_text');
    try{
      var fac_image_file_ref=document.getElementById('non_fac_image_file').files[0];

    }catch(e){$.notify("No image file selected",'error');}
    if(check_duplicate(non_t_fac_array,fac_image_file_ref.name,1))
    {
      $.notify("The image name is already in use\nChange the image name and try");
      return 0;
    }

    var progress_bar_add=document.getElementById('fac_progress_bar');
    var update_fac_sec=document.getElementById('new_non_fac_portal');
    /*===========================
    UPLOAD TASK
    ===========================*/
        var uploadTask = firebase.storage().ref("AT/fac_images/non_teaching/"+fac_image_file_ref.name).put(fac_image_file_ref);

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
          update_fac_sec.innerHTML="<div class='col-lg-4 col-md-4 col-sm-4' data-scroll-reveal='enter from the bottom after 0.4s'><div class='faculty-div form-group'><h2>TEACHNICAL STAFF</h2><img src='../images1/default_avatar.png' class='img-rounded' width='250' heigth='250' id='non_fac_img'><input type='file' id='non_fac_image_file' onchange='preview_image()'><h3 id='non_fac_name'>Name</h3><hr /><input type='text' id='non_fac_name_txt' class='form-control input-sm fac_textbox' value='name' ><h4>Qualification</h4><input type='text' class='form-control input-sm fac_textbox' id='non_fac_qualification_text' value='qualification'><br /><h4 id='non_fac_designation'>designation</h4><input type='text' class='form-control input-sm fac_textbox' id='fac_designation_text' value='designation' ><br /><h4 id='fac_years_of_exp'>year of exp</h4><input type='text' class='form-control input-sm fac_textbox' id='non_fac_years_of_exp_text' value='year of exp' ><br /><input type='button' class='btn btn-primary' value='Update' onclick='upload_new_non_fac()'></div></div>";
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
       name : new_non_fac_name.value,
       qualification : new_non_fac_qualification.value,
        designation  : new_non_fac_designation.value,
       date_of_joining : new_non_fac_exp.value,
        img_url : downloadURL,
        img_name : fac_image_file_ref.name
     };

     // Get a key for a new Post.
     var newPostKey = firebase.database().ref('AT/AT_faculty/non_teaching/').child('posts').push().key;

     // Write the new post's data simultaneously in the posts list and the user's post list.
     var updates = {};
     updates['AT/AT_faculty/non_teaching/'+ newPostKey] = facData;

     console.log("The data has been uploaded");
     new_non_fac_name.value="name";
     new_non_fac_qualification.value="Qualification";
     new_non_fac_designation.value="designation";
     new_non_fac_exp.value="year of exp";
     return firebase.database().ref().update(updates);
      });//uploading a list has been completed

  }


  function remove_non_fac(location_num)
  {
    $.notify("Please Dont refresh or close the page\nwe are removing the faculty data",'info');
    console.log("About remove Data");
    var remove_ref=firebase.storage().ref('AT/fac_images/non_teaching/'+non_t_fac_array[location_num-1][1].img_name);
    remove_ref.delete().then(function(){
      firebase.database().ref('AT/AT_faculty/non_teaching/'+non_t_fac_array[location_num-1][0]).remove();


        $.notify("Remove succesfull", 'success');

    }).catch(function(error){
        $.notify("Remove Failed\n"+error.name,'error');
    });

  }



  function update_non_fac_img(location_num)
  {
    var fac_img_file=document.getElementById('non_fac_image_file'+location_num).files[0];


    if(check_duplicate(non_t_fac_array,fac_img_file.name,1))
    {
      $.notify("The image name is already in use\nPls try an differnent image file name");
      return 0;
    }

    firebase.storage().ref('AT/fac_images/non_teaching/'+non_t_fac_array[location_num-1][1].img_name).delete().then(function(){

        $.notify("Remove succesfull", 'info');
        upload_non_fac_image_fire(fac_img_file,location_num);


    }).catch(function(error){
      console.log("Remove Failed\n"+error.name);
      upload_non_fac_image_fire(fac_img_file,location_num);
    });

  }



  function upload_non_fac_image_fire(fac_img_file,location_num)
  {
    console.log("Uploading fac image");
    var uploadTask=firebase.storage().ref("AT/fac_images/non_teaching"+fac_img_file.name).put(fac_img_file);

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

       firebase.database().ref('AT/AT_faculty/non_teaching/'+non_t_fac_array[location_num-1][0]+'/img_url').set(downloadURL);
       firebase.database().ref('AT/AT_faculty/non_teaching/'+non_t_fac_array[location_num-1][0]+'/img_name').set(fac_img_file.name);
    });//uploading a list has been completed

  }
