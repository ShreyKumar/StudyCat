const PORT = 3000
const express = require('express')
const body_parser = require("body-parser")
const app = express()
var user_manager = require("user_manager.js")

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

app.post('/sign_up', function(req, res){
	var username = req.body.user
	var password = req.body.password

	if (username && password) {
		try {
			var firebase_data = auth.sign_up(firebase, username, password)
			var person = user_manager.get_user(username, firebase_data)
		} catch (e){
			res.status(400).send(e)
		}
		res.status(200).send("sign_up successful " + username)
	} else {
		res.status(400).send("bad request")
	}

})

app.post('/login', function(req, res){
	var username = req.body.user
	var password = req.body.password

	if (username && password) {
		try {
			var user = auth.sign_in(firebase, username, password)
			var person = user_manager.get_user(username, firebase_data)
			res.status(200).send(person.authkey)
		} catch (e){
			res.status(400).send(e)
		}
	} else {
		res.status(400).send("no user data")
	}
	
})

app.get('/get_data', function(req, res) {
	
	var user_name = req.headers.user
	var authkey = req.headers.authkey
	try {
		var user = user_manager.get_user(user_name)
		if (user.authkey == authkey){
			return user.get_data()
		}
		else{
			res.status(400).send("wrong or missing authkey")
		}
	} catch (e){
		res.status(400).send("error")
	}
})



app.post('/input_data', function(req, res) {
	var user_name = req.headers.user
	var authkey = req.headers.authkey

	var chrome_data = req.body.chrome_data
	var process_data = req.body.process_data
	var current_cat_state = req.body.current_cat_state
	cnt = 0
	if (!chrome_data) cnt ++
	if (!process_data) cnt ++

	if (cnt > 1 || !user_name || !authkey || !current_cat_state)
		res.send(400).send("bad request params")

	try {
		var user = user_manager.get_user(user_name)
		if (user.authkey == authkey){
			user_manager.update_data(chrome_data, process_data, current_cat_state)
		}
		else{
			res.status(400).send("wrong authkey for username")
		}
	} catch (e){
		res.status(400).send(e)
	}

})


app.listen(PORT)
console.log('Listening on port '+PORT)