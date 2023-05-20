const D = new Date();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid);

    var userEmail = user.email;
    console.log(userEmail);

    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .get()
      .then((doc) => {
        let userName = doc.data().userName;
        let userEmail = doc.data().emailAddress;
        document.getElementById("userName").innerText =
          "Welcome" + " " + userName;
        document.getElementById("email").innerText = userEmail;
      });
    document.getElementById("send").onclick = function () {
      let tweet = document.getElementById("tweet").value;

      firebase
        .firestore()
        .collection("Tweets")
        .doc()
        .set({
          tweets: tweet,
          userId: uid,
          todayDate: D.toString(),
        })
        .then(() => {
          window.location.reload();
        });
    };
    document.getElementById("logOut").onclick = function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          window.location.href = "/login.html";
        })
        .catch((error) => {
          // An error happened.
        });
    };
  } else {
    window.location.href = "/login.html";
  }

  firebase
    .firestore()
    .collection("Users")
    .get()
    .then((querryUser) => {
      querryUser.forEach((userDoc) => {
        let user = userDoc.data().userName;
        let userId = userDoc.data().userId;
        firebase
          .firestore()
          .collection("Tweets")
          .get()
          .then((querryTweets) => {
            let content = " ";

            querryTweets.forEach((tweetDoc) => {
              let tweetUserId = tweetDoc.data().userId;
              let tweet = tweetDoc.data().tweets;
              let handle = "@" + user;

              console.log(tweet);
              if (userId === tweetUserId) {
                content += "<div class = 'wehh'>";
                content = "<p>" + user + "</p>";
                content += "<p>" + handle + "</p>";
                content += "<p>" + tweet + "</p>";

                content += "</div>";
              }
              $("#container").append(content);
            });
            
          });
      });
    });
});
