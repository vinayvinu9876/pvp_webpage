var message_Ref=firebase.database().ref('home/messages');
var message_arr;
var no_of_message;

message_Ref.on('value',function(snap){

  try{
  var message_obj=snap.val();
  no_of_message=Object.keys(message_obj).length;
  message_arr=Object.keys(message_obj).map(function(key){
    return [key,message_obj[key]];
  });

}
catch(e)
{
  var chat_content_div=document.getElementById('visible_msg_content');
  chat_content_div.innerHTML="<h1>NO MESSAGE</h1>";
  no_of_message=0;
}
  if(no_of_message>=5)
  {
  create_messages_sec(1,5,0);
  write_messages_data(1,5);
}
else if(no_of_message<5 && no_of_message!=0)
{
  create_messages_sec(1,no_of_message,0);
  write_messages_data(1,no_of_message);
}
else
{
  //do nothing
}
});


function create_messages_sec(start,end,specified)
{
  var chat_content_div=document.getElementById('visible_msg_content');

  if(specified===0)
  {
   $('#visible_msg_content').html(" ");
  }
  else {
    $('#hidden_msg_content').html(" ");

  }
  var msg_html;
  for(i=start;i<=end;i++)
  {
    if(i%2==0)
    {
        msg_html="<div class='container1 darker' id='one_msg'><h1 id='sender_name"+i+"' class='right'>Loading</h1><h3 id='contact_num"+i+"'>Loading</h3><h4 id='subject"+i+"'>Loading</h4><br /><p id='mesg"+i+"'>Loading</p><br /><br /><span class='time-right' id='send_time"+i+"'>Loading</span><br /><input type='button' class='btn btn-danger' onclick='remove_this_msg("+i+")' value='Delete'></div> ";
    }
    else {
        msg_html="<div class='container1' id='two_msg'><h1 id='sender_name"+i+"'>Loading</h1><h3 id='contact_num"+i+"'>Loading</h3><h4 id='subject"+i+"'>Loading</h4><br /><p id='mesg"+i+"'>Loading</p><br /><br /><span class='time-left' id='send_time"+i+"'>Loading</span><br /><input type='button' class='btn btn-danger' onclick='remove_this_msg("+i+")' value='Delete'></div>";
    }
    chat_content_div.innerHTML=chat_content_div.innerHTML+msg_html;
  }
}

function write_messages_data(start,end)
{
  for(i=start;i<=end;i++)
  {
    var sender_name=document.getElementById('sender_name'+i);
    var contact_no=document.getElementById('contact_num'+i);
    var subject=document.getElementById('subject'+i);
    var mesg=document.getElementById('mesg'+i);
    var send_time=document.getElementById('send_time'+i);

    sender_name.innerHTML=message_arr[no_of_message-i][1].name;
    contact_no.innerHTML=message_arr[no_of_message-i][1].contact_num;
    subject.innerHTML=message_arr[no_of_message-i][1].subject;
    mesg.innerHTML=message_arr[no_of_message-i][1].message;
    send_time.innerHTML=message_arr[no_of_message-i][1].date;

  }
}


function see_all_msg()
{
  var see_msg_btn=document.getElementById('see_all_msg_btn');
  see_msg_btn.style.visibility='hidden';
  var hide_msg_btn=document.getElementById('hide_all_msg_btn');

  hide_msg_btn.style.visibility='visible';
if(no_of_message>5)
{
  create_messages_sec(6,no_of_message,1);
  write_messages_data(6,no_of_message);
}
}

function hide_all_msg()
{
  var see_msg_btn=document.getElementById('see_all_msg_btn');
  see_msg_btn.style.visibility='visible';
  var hide_msg_btn=document.getElementById('hide_all_msg_btn');
  hide_msg_btn.style.visibility='hidden';
  var hidden_msg_cont=document.getElementById('hidden_msg_content');
  hidden_msg_cont.innerHTML="";
}


function remove_this_msg(location_num)
{
    firebase.database().ref('home/messages/'+message_arr[no_of_message-location_num][0]).remove();
    $.notify("Message Deleted ",'warn');
}
