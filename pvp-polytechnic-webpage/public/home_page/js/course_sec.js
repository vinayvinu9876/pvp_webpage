var course_ref=firebase.database().ref('home/courses/');

var no_of_course;
var course_arr;


course_ref.on('value',function(snap){

  try{
  var course_obj=snap.val();
  no_of_course=Object.keys(course_obj).length;
  course_arr=Object.keys(course_obj).map(function(key){
    return [key,course_obj[key]];
    });

}
catch(e)
{
console.log("Course is 0 "+e);
no_of_course=0
};




  if(no_of_course>9)
  {
  create_course_sec();
  write_excess_course_data();
}
else if(no_of_course===0)
{
  //do nothing
}
if(no_of_course!=0)
{
  write_course_data();
}
});

function create_course_sec()
{
  var course_container=document.getElementById('add_courses');



  for(i=10;i<=no_of_course;i++)
  {
    var course_html="<li><div class='single_course'><div class='singCourse_imgarea'><img src='img/course-1.jpg' id='course_img"+i+"' height='300' width='400'/><div class='mask'><a href='#' id='course_hyperlink"+i+"' class='course_more'>View Course</a></div></div><div class='singCourse_content'><h3 class='singCourse_title'><a href='' id='dept_name"+i+"'>Dept of Cs</a></h3><p id='dept_desc"+i+"'>hvjv</p></div><div class='singCourse_author'><img src='img/author.jpg' alt='img' id='hod_image"+i+"'><p id='hod_name"+i+"'>HOD</p></div></div></li>";

    course_container.innerHTML=course_container.innerHTML+course_html;

  }
}

function write_course_data()
{

  for(i=1;i<=9;i++)
  {
    var hod_image_elem=document.getElementById('hod_image'+i);
    var hod_name_elem=document.getElementById('hod_name'+i);

    hod_image_elem.src=course_arr[i-1][1].hod_img_url;
    hod_name_elem.innerHTML=course_arr[i-1][1].c_hod;
  }
}
function write_excess_course_data()
{
  for(i=10;i<=no_of_course;i++)
  {
    var course_img_elem=document.getElementById('course_img'+i);
    var course_hyper_link_elem=document.getElementById('course_hyperlink'+i);
    var dept_name_elem=document.getElementById('dept_name'+i);
    var dept_desc_elem=document.getElementById('dept_desc'+i);
    var hod_image_elem=document.getElementById('hod_image'+i);
    var hod_name_elem=document.getElementById('hod_name'+i);

    course_img_elem.src=course_arr[i-1][1].img_url;
    course_hyper_link_elem.href=course_arr[i-1][1].href;
    dept_name_elem.innerHTML=course_arr[i-1][1].cname;
    dept_desc_elem.innerHTML=course_arr[i-1][1].c_desc;
    hod_image_elem.src=course_arr[i-1][1].hod_img_url;
    hod_name_elem.innerHTML=course_arr[i-1][1].c_hod;
  }

}
