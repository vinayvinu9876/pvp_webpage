var management_ref=firebase.database().ref('home/management/');
var no_of_persons;
var management_arr;

console.log("\n\n\n\nI am from management JS");

management_ref.on('value',function(snap){
try{
  var management_obj=snap.val();

  no_of_persons=Object.keys(management_obj).length;

  management_arr=Object.keys(management_obj).map(function(key){
    return [key,management_obj[key]];
  });
  }
  catch(e)
  {
    console.log("Management Error "+e);
    no_of_persons=0;
    document.getElementById('add_management').innerHTML="<h1>No Data</h1>";
  }

  if(no_of_persons!=0)
  {
  console.log(management_arr);
  create_management_sec();
  write_management_sec();
}
});

function create_management_sec()
{
  var  management_elem=document.getElementById('add_management');
  management_elem.innerHTML="";
  for(i=1;i<=no_of_persons;i++)
  {

    var person_html="<div class='col-sm-3 col-xs-12'><div class='card card-block'><img alt='' class='team-img' src='img/author.jpg' id='p_img"+i+"'><div class='card-title-wrap'><span class='card-title' id='p_name"+i+"'></span><br /><span class='card=text' id='p_qualification"+i+"'></span><br /><span class='card=text' id='p_position"+i+"'></span><br /><span class='card=text' id='p_designation"+i+"'></span></div></div></div>";
    management_elem.innerHTML=management_elem.innerHTML+person_html;
    if(i%4==0)
    {
      var end_row="</div>";
      var add_row="<div class='row'>";
      management_elem.innerHTML=management_elem.innerHTML+end_row+add_row;
    }
  }
  management_elem.innerHTML=management_elem.innerHTML+"</div>";
  console.log(management_elem.innerHTML);
}


function write_management_sec()
{

  for(i=0;i<no_of_persons;i++)
  {
    var p_img_ref=document.getElementById('p_img'+(i+1));
    var p_name_ref=document.getElementById('p_name'+(i+1));
    var p_designation_ref=document.getElementById('p_designation'+(i+1));
    var p_qualification_ref=document.getElementById('p_qualification'+(i+1));
    var p_position_ref=document.getElementById('p_position'+(i+1));

    p_img_ref.src=management_arr[i][1].img_url;
    p_name_ref.innerHTML=management_arr[i][1].name;
    p_designation_ref.innerHTML=management_arr[i][1].designation;
    p_qualification_ref.innerHTML=management_arr[i][1].qualification;
    p_position_ref.innerHTML=management_arr[i][1].position;


  }

}
