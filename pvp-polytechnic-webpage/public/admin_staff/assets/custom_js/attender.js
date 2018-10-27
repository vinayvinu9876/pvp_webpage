/*
************Fectching the details of faculty1******
*/


  var name_attender1,designation_attender1,qualification_attender1;
  let AttenderDataRef = firebase.database().ref('ADMINISTRATION/ADMINISTRATION_faculty/attender/');
  console.log("About  to initialize Data ");
  AttenderDataRef.on("value", function(snap) {

try{
    var data_object=snap.val();
    var num_of_attender=Object.keys(data_object).length;
    var attender_array= Object.keys(data_object).map(function(key) {
      return [key, data_object[key]];
        });
      add_attender_elements(num_of_attender);
        write_all_attender_det(num_of_attender,attender_array);
    }
    catch(e)
    {
      console.log("There is no data of faculties "+e.name);
    }






      });
/*Writing faculty1 details to page*/

/*Write of fac1 details to webpage complete vinay*/



function add_attender_elements(num_of_attender)
{
  console.log("function add initialized");

var get_elem=document.getElementById('attender');
get_elem.innerHTML="<center><h2>ATTENDER</h2></center>";
  var end_row="</div>";
  console.log("ABOUT to add dynamic elements");

  for(i=1;i<=num_of_attender;i++)
  {
    var add_elem_div="<div class='col-lg-4 col-md-4 col-sm-4' data-scroll-reveal='enter from the bottom after 0.4s'> <div class='faculty-div'> ";
    var add_img_elem="<img src='../images1/default_avatar.png' class='img-rounded width='250' heigth='200' id='attender"+i+"_img'> <h3 id='attender"+i+"_name'>HELLO from "+i+"</h3><hr />"
  var add_design_elem="<h4 id='attender"+i+"_designation'>GOOD</h4><h4 id='attender"+i+"_qualification'></h4></div></div> ";

  var add_elem=add_elem_div+add_img_elem+add_design_elem;


    get_elem.innerHTML=get_elem.innerHTML+add_elem;
    if(i%3===0)
    {
      var new_row="<br /><br /><div class='row'>";
      get_elem.innerHTML=get_elem.innerHTML+new_row;
    }
  }
}


function write_all_attender_det(num_of_attender,attender_array)
{

  for(i=1;i<=num_of_attender;i++)
  {
    var name_ref="attender"+i+"_name";
    var designation_ref="attender"+i+"_designation";
    var qualification_ref="attender"+i+"_qualification";
    var img_ref="attender"+i+"_img";

    var name_elem=document.getElementById(name_ref);
    var designation_elem=document.getElementById(designation_ref);
    var qualification_elem=document.getElementById(qualification_ref);
    var img_elem=document.getElementById(img_ref);

    name_elem.innerHTML=attender_array[i-1][1].name;
    designation_elem.innerHTML=attender_array[i-1][1].designation;
    qualification_elem.innerHTML=attender_array[i-1][1].qualification;
    img_elem.src=attender_array[i-1][1].img_url;
    img_elem.width="250";
    img_elem.height="200";


  }

}
