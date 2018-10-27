function send_message()
{
  try{
  var name=document.getElementById('sender_name').value;
  var contact_num=document.getElementById('sender_contact_num').value;
  var subject=document.getElementById('sender_subject').value;
  var msg=document.getElementById('sender_msg').value;
}
catch(e)
{
  alert("Some value is missing "+e);
}
  if(validate_phonenumber(contact_num))
  {
    var message_data={
      name : name,
      contact_num : contact_num,
      subject : subject,
      message : msg,
      date : new Date().toLocaleString()
    };
    try{
    var messages_ref=firebase.database().ref('home/messages/');
    var newPostKey=messages_ref.child('posts').push().key;
    var updates={};
    updates['home/messages/'+newPostKey]=message_data;

    alert("Your message has been sent\nThank you");
    return firebase.database().ref().update(updates);
  }catch(e){alert("Send Message Failed");}
  }
}

function validate_phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if((inputtxt.match(phoneno)))
        {
      return true;
        }
      else
        {
        alert("Invalid phone number");
        return false;
        }
}
