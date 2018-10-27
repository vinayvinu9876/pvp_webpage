var testimonial_ref=firebase.database().ref('home/testimonial/');
var testimonial_arr;

testimonial_ref.on('value',function(snap){

try{
   var testimonial_obj=snap.val();

        testimonial_arr=Object.keys(testimonial_obj).map(function(key){
          return [key,testimonial_obj[key]];
        });

        write_testimonials(testimonial_arr);
      }
      catch(e)
      {
        console.log("Testimonial Error "+e);
      }
});

function write_testimonials(testimonial_arr)
{
  for(i=1;i<=3;i++)
  {
    var msg_ref=document.getElementById('msg'+i);
    var s_name_ref=document.getElementById('s_name'+i);
    var s_desc_ref=document.getElementById('s_desc'+i);
    var s_current_status_ref=document.getElementById('s_current_status'+i);
    var img_ref=document.getElementById('s_img'+i);

  img_ref.src=testimonial_arr[i-1][1].img_url;
  msg_ref.innerHTML=testimonial_arr[i-1][1].msg;
  s_name_ref.innerHTML=testimonial_arr[i-1][1].name;
  s_desc_ref.innerHTML=testimonial_arr[i-1][1].desc;
  s_current_status_ref.innerHTML=testimonial_arr[i-1][1].status;
  try{
    var portal_testimonial_data=document.getElementById('testimonial_data'+i);
    var portal_name=document.getElementById('testimonial_name'+i);
    var portal_desc=document.getElementById('testimonial_desc'+i);
    var portal_current_status=document.getElementById('testimonial_status'+i);
    portal_name.value=testimonial_arr[i-1][1].name;
    portal_testimonial_data.value=testimonial_arr[i-1][1].msg;
    portal_desc.value=testimonial_arr[i-1][1].desc;
    portal_current_status.value=testimonial_arr[i-1][1].status;

  }
  catch(e)
  {
    console.log("Not portal");
  }
  }

}
