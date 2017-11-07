const PORT = 3000
const express = require('express')
const body_parser = require("body-parser")
const app = express()
var user_manager = require("./user_manager.js")

var firebase = require("firebase");
var auth = require("./authentication.js")



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

app.post('/sign_up', function(req, res){
	var username = req.headers.user
	var password = req.headers.password

	if (username && password) {
		firebase.auth().createUserWithEmailAndPassword(username, password).then(function (fdata){
			var person = user_manager.get_user(username)
			res.status(200).send("sign_up successful " + username)
		}).catch(function(error) {
		    // Handle Errors here.
		    var errorCode = error.code;
		    var errorMessage = error.message;
		    
		    res.status(400).send(errorCode)

		});
		
	} else {
		res.status(400).send("bad request")
	}

})

app.post('/login', function(req, res){
	var username = req.headers.user
	var password = req.headers.password

	if (username && password) {
		firebase.auth().signInWithEmailAndPassword(username, password).then(function (fdata){
			var person = user_manager.get_user(username)
			res.status(200).send(person.authkey)
		}).catch(function(error) {
		    // Handle Errors here.
		    var errorCode = error.code;
		    var errorMessage = error.message;
		    
		    res.status(400).send(errorCode)

		});
		
	} else {
		res.status(400).send("no user data")
	}
	
})

app.get('/get_data', function(req, res) {
	
	var user_name = req.headers.user
	var authkey = req.headers.authkey
	var user = user_manager.get_user(user_name)
	if (user.authkey == authkey){
		res.status(200).send(user.get_data())
	}
	else{
		res.status(400).send("wrong or missing authkey")
	}
	
})



app.post('/input_data', function(req, res) {
	var user_name = req.headers.user
	var authkey = req.headers.authkey
	var chrome_data = req.body.chrome_data
	var process_data = req.body.process_data
	var current_cat_state = req.body.current_cat_state



	try {
		var user = user_manager.get_user(user_name)
		if (user.authkey === authkey){
			var c = user.update_data(chrome_data, process_data, current_cat_state)
			res.status(200).send("successfully updated " + c + " values")
		}
		else{
			res.status(400).send("wrong authkey for username")
		}
	} catch (e){
		console.log(e)
		res.status(400).send(e)
	}

})


app.listen(PORT)
console.log('Listening on port ' + PORT)