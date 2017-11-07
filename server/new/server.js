const PORT = 3000
const express = require('express')
const body_parser = require("body-parser")
const app = express()

//import packages
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyA-i7JSXv8MigYmSZNPmRp10d-XAPWcK54",
    authDomain: "studycat-f990d.firebaseapp.com",
    databaseURL: "https://studycat-f990d.firebaseio.com",
    projectId: "studycat-f990d",
    storageBucket: "studycat-f990d.appspot.com",
    messagingSenderId: "587857013941"
};
firebase.initializeApp(config);

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

var currentUser;

app.post("/signup", function(req, res){

  var email = req.body.email;
  var password = req.body.password;

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    var msg = {error: {}};
    res.send(msg);
  }, function(error){
    var msg = error;
    res.send(msg);
  })


})

app.post("/signin", function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    //successfully signed in
    var msg = {error: {}};
    res.send(msg);
  }, function(error){
    var msg = error;
    res.send(msg);
  })

});

app.post("/signout", function(req, res){
  firebase.auth().signOut().then(function(){
    res.send("Signed out successfully");
  }, function(){
    res.send(error);
  })
})

//automatically updates the current user
firebase.auth().onAuthStateChanged(function(user){
  if(user){
    currentUser = {
      uid: user.uid,
      email: user.email
    };
  }
});

app.get("/user", function(req, res){
  res.send(currentUser);
})

app.post("/tabs", function(req, res){
  var tabs = req.body.tabs;
  if(currentUser){
    firebase.database().ref("users/" + user.uid).set({
      email: user.email,
      tabs: tabs
    })
  }
})


app.listen(PORT);
console.log("Listening on port 3000 on new")
