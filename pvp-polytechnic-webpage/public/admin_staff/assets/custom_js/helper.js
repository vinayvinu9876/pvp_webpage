/*
************Fectching the details of faculty1******
*/


  var name_helper1,designation_helper1,qualification_helper1;
  let helperDataRef = firebase.database().ref('ADMINISTRATION/ADMINISTRATION_faculty/helper/');
  console.log("About  to initialize Data ");
  helperDataRef.on("value", function(snap) {

try{
    var data_object=snap.val();
    var num_of_helper=Object.keys(data_object).length;
    var helper_array= Object.keys(data_object).map(function(key) {
      return [key, data_object[key]];
        });
      add_helper_elements(num_of_helper);
        write_all_helper_det(num_of_helper,helper_array);
    }
    catch(e)
    {
      console.log("There is no data of faculties "+e.name);
    }






      });
/*Writing faculty1 details to page*/

/*Write of fac1 details to webpage complete vinay*/



function add_helper_elements(num_of_helper)
{
  console.log("function add initialized");

var get_elem=document.getElementById('helper');
get_elem.innerHTML="<center><h2>D GROUP HELPERS</h2></center>";
  var end_row="</div>";
  console.log("ABOUT to add dynamic elements");

  for(i=1;i<=num_of_helper;i++)
  {
    var add_elem_div="<div class='col-lg-4 col-md-4 col-sm-4' data-scroll-reveal='enter from the bottom after 0.4s'> <div class='faculty-div'> ";
    var add_img_elem="<img src='../images1/default_avatar.png' class='img-rounded width='250' heigth='200' id='helper"+i+"_img'> <h3 id='helper"+i+"_name'>HELLO from "+i+"</h3><hr />"
  var add_design_elem="<h4 id='helper"+i+"_designation'>GOOD</h4><h4 id='helper"+i+"_qualification'></h4></div></div> ";

  var add_elem=add_elem_div+add_img_elem+add_design_elem;


    get_elem.innerHTML=get_elem.innerHTML+add_elem;
    if(i%3===0)
    {
      var new_row="<br /><br /><div class='row'>";
      get_elem.innerHTML=get_elem.innerHTML+new_row;
    }
  }
}


function write_all_helper_det(num_of_helper,helper_array)
{

  for(i=1;i<=num_of_helper;i++)
  {
    var name_ref="helper"+i+"_name";
    var designation_ref="helper"+i+"_designation";
    var qualification_ref="helper"+i+"_qualification";
    var img_ref="helper"+i+"_img";

    var name_elem=document.getElementById(name_ref);
    var designation_elem=document.getElementById(designation_ref);
    var qualification_elem=document.getElementById(qualification_ref);
    var img_elem=document.getElementById(img_ref);

    name_elem.innerHTML=helper_array[i-1][1].name;
    designation_elem.innerHTML=helper_array[i-1][1].designation;
    qualification_elem.innerHTML=helper_array[i-1][1].qualification;
    img_elem.src=helper_array[i-1][1].img_url;
    img_elem.width="250";
    img_elem.height="200";


  }

}
