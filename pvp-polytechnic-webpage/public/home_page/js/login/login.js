var auth=firebase.auth();

console.log("Welcome to Login form");

function login_into_portal()
{
  console.log("From login js");
  var email=$('#u_name').val();
  var password=$('#password').val();

  auth.signInWithEmailAndPassword(email, password).then(function(){

    console.log("Login Sucessfull");
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  $.notify(errorMessage);
  $('#u_email').val("");
  $('#password').val("");
  $("#u_email").focus();
  // ...
});
}
