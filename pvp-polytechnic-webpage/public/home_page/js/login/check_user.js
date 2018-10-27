var auth=firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("USr has logged in ");
    console.log(user.email);
    console.log(user.uid);
    // ...
  } else {
    // User is signed out.
    console.log("No user logged in ");


    // ...
  }
});
