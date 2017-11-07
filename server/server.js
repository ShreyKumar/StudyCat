const PORT = 3000
const express = require('express')
const body_parser = require("body-parser")
const app = express()

var firebase = require("firebase");
var auth = require('authentication.js')

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

app.post('/login', function(req, res){
	var username = req.body.user
	var password = req.body.password

	if ((username && password) && (!has_user(username))) {
		var user = auth.sign_up(firebase, username, password)
		// Do what you want with user i guess
		res.status(200).send(username)
	} else if (username && password) {
		var user = auth.sign_in(firebase, username, password)
		res.status(200).send(username)
	} else {
		res.status(400).send("no user data")
	}

})


function has_user(user_name){
	return app.users.indexOf(user_name) != -1
}

app.get('/get_data', function(req, res) {

	var user_name = req.headers.user
	if (!has_user(user_name))
		res.status(400).send("argument: user=string")
	else if (!app.user_to_data.user_name)
		res.status(400).send("no user data")
	else
  		res.status(200).send(app.user_to_data.user_name)
})



app.post('/input_data', function(req, res) {
	var user_name = req.body.user

	var proc = req.body.proc
	if (!has_user(user_name)){
		res.status(400).send("no_such_username")
		return
	}
	app.user_to_data.user_name = proc
	console.log(user_name, proc)

	var response_string = ""
	if (!user_name)
		response_string += "no user name"

	if (!proc)
		response_string += "\nproc invalid"

	if (response_string != "")
		res.status(400).send(response_string)
	else
		res.status(200).send("successful")
})


app.listen(PORT)
console.log('Listening on port '+PORT)
