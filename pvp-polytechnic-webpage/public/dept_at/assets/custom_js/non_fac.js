/*
************Fectching the details of faculty1******
*/



  let NonTeachingDataRef = firebase.database().ref('AT/AT_faculty/non_teaching/');
  console.log("About  to initialize Data ");
  NonTeachingDataRef.on("value", function(snap) {

try{
    var data_object=snap.val();
    var num_of_fac=Object.keys(data_object).length;
    var fac_array= Object.keys(data_object).map(function(key) {
      return [key, data_object[key]];
        });
      add_non_fac_elements(num_of_fac);
        write_all_non_fac_det(num_of_fac,fac_array);
    }
    catch(e)
    {
      console.log("There is no data of faculties "+e.name);
    }






      });
/*Writing faculty1 details to page*/

/*Write of fac1 details to webpage complete vinay*/



function add_non_fac_elements(num_of_fac)
{
  console.log("function add initialized");

var get_elem=document.getElementById('non_fac_add');
get_elem.innerHTML="<center><h2>TECHNICAL STAFF</h2></center>";
  var end_row="</div>";
  console.log("ABOUT to add dynamic elements");

  for(i=1;i<=num_of_fac;i++)
  {
    var add_elem_div="<div class='col-lg-4 col-md-4 col-sm-4' data-scroll-reveal='enter from the bottom after 0.4s'> <div class='faculty-div'> ";
    var add_img_elem="<img src='../images1/default_avatar.png' class='img-rounded width='250' heigth='250' id='non_fac"+i+"_img'> <h3 id='non_fac"+i+"_name'>HELLO from "+i+"</h3><hr />";
var add_qualification_elem="<h4 id='non_fac"+i+"_qualification'></h4>";
  var add_design_elem="<h4 id='non_fac"+i+"_designation'>GOOD</h4><h4 id='non_fac"+i+"_years_of_exp'></h4></div></div> ";

  var add_elem=add_elem_div+add_img_elem+add_qualification_elem+add_design_elem;


    get_elem.innerHTML=get_elem.innerHTML+add_elem;
    if(i%3===0)
    {
      var new_row="<br /><br /><div class='row'>";
      get_elem.innerHTML=get_elem.innerHTML+new_row;
    }
  }
}


function write_all_non_fac_det(num_of_fac,fac_array)
{

  for(i=1;i<=num_of_fac;i++)
  {
    var name_ref="non_fac"+i+"_name";
    var designation_ref="non_fac"+i+"_designation";
    var qualification_ref="non_fac"+i+"_qualification"
    var years_of_exp_ref="non_fac"+i+"_years_of_exp";
    var img_ref="non_fac"+i+"_img";

    var name_elem=document.getElementById(name_ref);
    var designation_elem=document.getElementById(designation_ref);
    var qualification_elem=document.getElementById(qualification_ref);
    var years_of_exp_elem=document.getElementById(years_of_exp_ref);
    var img_elem=document.getElementById(img_ref);

    name_elem.innerHTML=fac_array[i-1][1].name;
    designation_elem.innerHTML=fac_array[i-1][1].designation;
    qualification_elem.innerHTML=fac_array[i-1][1].qualification;
    years_of_exp_elem.innerHTML=fac_array[i-1][1].date_of_joining;
    img_elem.src=fac_array[i-1][1].img_url;
    img_elem.width="250";
    img_elem.height="250";


  }

}
