/*MESSAGES INIT*/
var messages_ref=firebase.database().ref("civil/messages/");
var no_of_messages;
messages_ref.on('value',function(snap){
    no_of_messages=Object.keys(snap.val()).length;
});

/*=====
DEPT INIT
=======*/
console.log("From dept highlights");
var Data_Ref=firebase.database().ref('civil/dept_high_lights/');


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
