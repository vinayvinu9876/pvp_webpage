var auth=firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("USr has logged in ");
    console.log(user.email);
    window.location="index_portal.html";
    // ...
  } else {
    // User is signed out.
    console.log("No user logged in ");


    // ...
  }
});
