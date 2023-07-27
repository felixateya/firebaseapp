document.getElementById("logOut").onclick = function () {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid);

    var userEmail = user.email;
    console.log(userEmail);

    firebase.firestore().collection("Users").doc(uid).get().then((doc) => {
      let userName = doc.data().userName;
      let userEmail = doc.data().emailAddress;
      document.getElementById("userName").innerText = "Welcome" + " " + userName;
      document.getElementById("email").innerText = userEmail;
    })
  }
});
