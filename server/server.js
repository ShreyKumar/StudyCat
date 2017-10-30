const PORT = 3000
const express = require('express')
const body_parser = require("body-parser")
const app = express()


app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

//cors request
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
})

app.users = []
app.user_to_data = {}

app.post('/login', function(req, res){
	var user_name = req.body.user
	if (user_name && !has_user(user_name)){
		app.users.push(user_name)
		res.status(200).send("Success")
	} else {
		var str = !user_name ? "argument: user=string" : "user exists"
		res.status(400).send(str)
	}

	console.log(app.users)

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

app.get("/currentuser", function(req, res){
	res.send(app.users);
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
