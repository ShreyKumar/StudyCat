//Requires
//---------------------------------------------
const express = require('express')
const body_parser = require("body-parser")
var firebase = require("firebase");
var user_manager = require("./user_manager.js")
//---------------------------------------------

//Initialize express application block
//---------------------------------------------
const app = express()
const PORT = 3000


app.listen(PORT)
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())


console.log('Listening on port ' + PORT)
//---------------------------------------------

//Intialize firebase application block
//---------------------------------------------
var config = {
    apiKey: "AIzaSyA-i7JSXv8MigYmSZNPmRp10d-XAPWcK54",
    authDomain: "studycat-f990d.firebaseapp.com",
    databaseURL: "https://studycat-f990d.firebaseio.com",
    projectId: "studycat-f990d",
    storageBucket: "studycat-f990d.appspot.com",
    messagingSenderId: "587857013941"
};

firebase.initializeApp(config);

//enable cors
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,user,password");
  next();
})


//---------------------------------------------


//---------------------------------------------
//User
//---------------------------------------------
app.post('/sign_up', function(req, res){
	var username = req.headers.user
	var password = req.headers.password
	//Requires username and password

	if (username && password) { //Assert that these are valid.
		firebase.auth().createUserWithEmailAndPassword(username, password).then(function (fdata){
			var person = user_manager.get_user(username, true) //auth promise for person
			res.status(200).send({
        msg: "Sign up sucessful",
        user: username,
        authkey: person.authkey
      })
		}).catch(function(error) {
		    // Handle Errors here.
		    var errorCode = error.code;
		    var errorMessage = error.message;


		    res.status(400).send(errorCode)

		})

	} else {
		res.status(400).send("null username or password") //error
	}

})

app.post('/login', function(req, res){


	var username = req.headers.user
	var password = req.headers.password
	//Requires username and password

	if (username && password) { //Assert these are valid

		firebase.auth().signInWithEmailAndPassword(username, password).then(function (fdata){
			var person = user_manager.get_user(username, true) //Get the user (but create if null)
			res.status(200).send(person.authkey) //Send the auth key
		}).catch(function(error) {
		    // Handle Errors here.
		    var errorCode = error.code;
		    var errorMessage = error.message;


		    res.status(400).send(errorCode)

		})

	} else {
		res.status(400).send("null username or password") //error
	}
})

app.post("/sign_out", function(req, res){
  firebase.auth().signOut().then(function(){
    res.status(200).send("Signed out successfully");
  }, function(){
    res.status(400).send(error);
  })
})

app.get('/get_data', function(req, res) {
	var user_name = req.headers.user
	var authkey = req.headers.authkey
	//Requires username and authkey

	if (user_name && authkey){ //Assert these are valid.
		var user = user_manager.get_user(user_name)
		if (!user)
			res.status(400).send("Invalid username")
		//Assert that the username exists in our list.


		//Compare given auth keys, if true
		if (user.authkey == authkey){
			//We send the data
			res.status(200).send(user.get_data())
		}
		else{
			res.status(400).send("wrong or missing authkey")
		}
	}else {
		res.status(400).send("null username or authkey")
	}
})



app.post('/input_data', function(req, res) {
	var user_name = req.headers.user
	var authkey = req.headers.authkey


	if (user_name && authkey){
		var user = user_manager.get_user(user_name)
		if (!user)
			res.status(400).send("Invalid username")
		//Assert that the username exists in our list.

		if (user.authkey === authkey){
			var c = user.update_data(req.body)
			res.status(200).send("successfully updated " + c + " values")
		} else{
			res.status(400).send("Wrong authkey for username")
		}
	}else {
		res.status(400).send("null username or authkey")
	}


})

//---------------------------------------------

//---------------------------------------------
//Database endpoints
//---------------------------------------------

var database = firebase.database();


app.post("/write_database", function(req, res) {
	var user_name = req.headers.user.split("@")[0]; //asume user is sent as email
	var data = req.body.data;

	if (user_name && data) { // assume valid
		database.ref("users").child(user_name).set(data).then(function() {
			res.status(200).send("data sent");
		});
	} else {
		res.status(400).send("null username and data")
	}

});

app.get("/read_database", function(req, res) {
	var user_name = req.headers.user.split("@")[0]; //asume user is sent as email
	var data;

	if (user_name) {
		firebase.database().ref("/users/" + user_name).once("value").then(function(snapshot) {
			if (snapshot == null) {
				res.status(404).send("no data to read")
			} else {
				data = snapshot.val();
				res.status(200).send(data);
			}
		})
	} else {
		res.status(400).send("null username")
	}

})

//---------------------------------------------
