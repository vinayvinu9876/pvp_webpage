function log_out()
{
  firebase.auth().signOut().then(function() {
    window.location="login.html";
}).catch(function(error) {
  // An error happened.
  $.notify(error.message);
});
}
