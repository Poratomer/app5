var db = firebase.firestore();
console.log("hey");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("loginDiv").style.display = "none"
    document.getElementById("welcomeDiv").style.display = "block"
    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      document.getElementById("userWelcome").innerHTML = email_id;
      const listDiv = document.querySelector("#list_div");
      db.collection("lessons").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              var d = (doc.data().hour).toDate();
              var b = 2- (doc.data().par);

              var c = doc.id;
              // console.log(d.toLocaleTimeString());
              console.log(c);

              listDiv.innerHTML +=
              "<div class='list_item'><h2>"+ d.toDateString()+"</h2><p>"+d.toLocaleTimeString() + " - in this lesson there is room for "+b+" more</p><button onclick='signLesson("+c+")'>sign</button></div>"

              // op2.innerHTML +="<button>hey</button>";
              // document.getElementById("list").innerHTML = "<p>" + doc.id + " "+ doc.data().hour + "</p>";
          });
      });
      db.collection("lessons").doc("Sunday").onSnapshot(function(doc) {
        console.log("Current data: ", doc.data().par);
    });

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

function signLesson(id){
  var docRef = db.collection("lessons").doc(id);
    docRef.get().then(function(doc) {
      if (doc.exists) {
          var a=(doc.data().par);
          a++;
          console.log(a);
          db.collection("lessons").doc(id).update({par: a})
          .then(function(){
            console.log("success");
            document.location.reload(true);
          })
          .catch(function(error){
            console.log(error);
          });
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

};

function login() {
  // add lesson
  // db.collection("lessons").doc("sunday").set({hour: "8:00"})
  // .then(function(){
  //   console.log("success");
  // })
  // .catch(function(error){
  //   console.log(error);
  // });


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
  var name = document.getElementById("name").value;
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
