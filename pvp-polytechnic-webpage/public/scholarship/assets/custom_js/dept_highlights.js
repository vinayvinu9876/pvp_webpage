console.log("From dept highlights");
var Data_Ref=firebase.database().ref('scholarship/dept_high_lights/');



var notice_arr;

Data_Ref.on('value',function(snap){

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

   create_event_list(0,no_of_notice);
   write_event_list(0,no_of_notice,null,notice_arr);
   try{add_notice_and_evt_textbox();}catch(e){console.log("Not portal");}
  //console.log("************************\n\nThe events arr is \n"+events_arr+"\n\nThe notices are"+notice_arr);

  });



function create_event_list(no_of_evts,no_of_notice)
{

  var get_notice_list=document.getElementById('notice_list');
  get_notice_list.innerHTML="";
  console.log("Creating evt list elements");


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

      for(i=1;i<=no_of_notice;i++)
      {
        var up_list_ref=document.getElementById('up_list'+i);
        up_list_ref.innerHTML=notice_arr[no_of_notice-i][1];
      }

}
