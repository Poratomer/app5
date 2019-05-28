
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("loginDiv").style.display = "none"
    document.getElementById("welcomeDiv").style.display = "block"
    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      document.getElementById("userWelcome").innerHTML = email_id;
      // const preObject = document.getElementById("object");
      // // Get a reference to the database service
      const databaseObject = firebase.database().ref().child("Object");
      databaseObject.on('value', snap => alert(snap.val()));
      // // databaseObject.on("value", snap => console.log(snap.val()));
      // document.getElementById("userWelcome").innerHTML = databaseObject;
    }
  } else {
    // No user is signed in.
    document.getElementById("loginDiv").style.display = "block"
    document.getElementById("welcomeDiv").style.display = "none"
  }
});


function login() {
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;
  // alert (userEmail);
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    alert("error " + errorMessage);
  });
}

function signIn(){
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  alert("error " + errorMessage);
});
}

function googlelogin(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // alert(user);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  alert(error);
  // ...
});
}

function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}
