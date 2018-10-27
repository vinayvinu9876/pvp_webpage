var messages_ref=firebase.database().ref("ADFT/messages/");
var no_of_messages;
messages_ref.on('value',function(snap){
  try{
    no_of_messages=Object.keys(snap.val()).length;
  }
  catch(e)
  {
    no_of_messages=0;
  }
});
function submit_request()
{
  var name=document.getElementById('name').value;
  var phone_num=document.getElementById('phone_num').value;
  var message=document.getElementById('message').value;

  if(validate_phonenumber(phone_num))
  {

  var message_data={
    name : name,
    date : new Date().toLocaleString(),
    phone_num :phone_num,
    message : message
  };

  var newPostKey=messages_ref.child('posts').push().key;
  var updates={};
  updates['ADFT/messages/'+newPostKey]=message_data;


  alert("Your Message has been sent");
  return firebase.database().ref().update(updates);

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
