function authenticate_user(email,password)
{
  $.notify("Authentication on process");
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    $.notify("Authentication succesfull");
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  $.notify("Authentication failed.Try reloading the page");
  var errorMessage = error.message;
  $.notify(errorMessage);
  /*window.location='404.html';*/
  // ...
});
}
