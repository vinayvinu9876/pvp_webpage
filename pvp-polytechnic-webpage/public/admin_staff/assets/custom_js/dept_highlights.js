console.log("From dept highlights");
var Data_Ref=firebase.database().ref('ADMINISTRATION/dept_high_lights/');


var post_data_array;
var events_arr;
var notice_arr;

Data_Ref.on('value',function(snap){


try{


  var post_obj=snap.val().posts;


  var number_of_posts=Object.keys(post_obj).length;

  post_data_array=Object.keys(post_obj).map(function(key){
    return [key,post_obj[key]];
  });
    create_posts(number_of_posts);
    write_post_data(number_of_posts,post_data_array);
    try{user_add_posts_edit()}catch(e){console.log("Not dept portal");}
  }

  catch(e){
    console.log("No posts to display for dept highlights");
    try{user_add_posts_edit()}catch(e){console.log("Not dept portal");}
  }

try{
  var  events_data_obj=snap.val().events;
  events_arr=Object.keys(events_data_obj).map(function(key){
    return [key,events_data_obj[key]];
 });
 var no_of_evts=Object.keys(snap.val().events).length;
}
catch(e)
{
  console.log("There are no events "+e.name);
  var no_of_evts=0;
}
try{
  var notice_obj=snap.val().notice;
  var  no_of_notice=Object.keys(snap.val().notice).length;
  notice_arr=Object.keys(notice_obj).map(function(key){
    return [key,notice_obj[key]];
 });
}
catch(e)
{
  console.log("No upcoming events");
  var no_of_notice=0;
}

 create_event_list(no_of_evts,no_of_notice);
   write_event_list(no_of_evts,no_of_notice,events_arr,notice_arr);
   try{add_notice_and_evt_textbox();}catch(e){console.log("Not portal");}
  console.log("************************\n\nThe events arr is \n"+events_arr+"\n\nThe notices are"+notice_arr);

  });

function create_posts(number_of_posts)
{
  console.log("Creating posts");
  var get_post_elem=document.getElementById('post_div');
  get_post_elem.innerHTML="";   //delete previous data
  for(i=1;i<=number_of_posts;i++)
  {
    console.log("for loop "+i);
  var post_html="<div class='row set-row-pad'><div class='col-lg-4 col-md-4 col-sm-4'></div><div class='col-lg-8 col-md-8 col-sm-8' data-scroll-reveal='enter from the bottom after 0.4s' id='posts"+i+"'><center><img src='../images1/image_default.png' class='img-thumbnail' id='post_img"+i+"' height='200' width='400'><p align='center' id='post_desc"+i+"'></p></center></div></div>";
  get_post_elem.innerHTML=get_post_elem.innerHTML+post_html;
  console.log("Adding "+i+"post");
  try{user_remove_posts_edit(i);}catch(e){console.log("Not portal dept remove");}
  }



}

function write_post_data(number_of_posts,post_data_array)
{
  console.log("writing post data");
  for(i=1;i<=number_of_posts;i++)
  {
    var img_url_ref="post_img"+i;
    var post_desc_ref="post_desc"+i;

    var img_elem=document.getElementById(img_url_ref);
    var post_desc_elem=document.getElementById(post_desc_ref);

    img_elem.src=post_data_array[i-1][1].img_url;
    console.log("img_url of post"+i+" is "+post_data_array[i-1][1].img_url);
    post_desc_elem.innerHTML=post_data_array[i-1][1].description;
    console.log("post description of post"+i+" post is "+post_data_array[i-1][1].description);
  }

}

function create_event_list(no_of_evts,no_of_notice)
{
  var get_evt_list=document.getElementById('evt_list');
  var get_notice_list=document.getElementById('notice_list');
  get_notice_list.innerHTML=""; get_evt_list.innerHTML="";
  console.log("Creating evt list elements");

  for(i=1;i<=no_of_evts;i++)
  {
    var list_html="<h4 id='list_sec"+i+"'><li id='list"+i+"'></li></h4>";
    get_evt_list.innerHTML=get_evt_list.innerHTML+list_html;
    try{evt_list_edit_remove('list_sec'+i,i);}catch(e){console.log("Not portal evt list");}
  }
  for(i=1;i<=no_of_notice;i++)
  {
    var list_html="<h4 id='notice_list_sec"+i+"'><li id='up_list"+i+"'></li></h4>";
    get_notice_list.innerHTML=get_notice_list.innerHTML+list_html;
    try{notice_list_edit_remove('notice_list_sec'+i,i);}catch(e){console.log("Not portal evt list");}
  }


}

function write_event_list(no_of_evts,no_of_notice,events_arr,notice_arr)
{

  console.log("Writing event list elements");
    for(i=1;i<=no_of_evts;i++)
    {
      var list_ref=document.getElementById('list'+i);
      list_ref.innerHTML=events_arr[no_of_evts-i][1];
    }
      for(i=1;i<=no_of_notice;i++)
      {
        var up_list_ref=document.getElementById('up_list'+i);
        up_list_ref.innerHTML=notice_arr[no_of_notice-i][1];
      }

}
1
