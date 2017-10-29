const port = 3000
const express = require('express')
const body_parser = require("body-parser")
const app = express()


app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
app.users = []

app.post('/login', function(req, res){
	var user_name = req.body.user
	if (user_name && !has_user(user_name)){
		app.users.push(user_name)
		res.status(200).send("Success")
	} else {
		res.status(400).send("Already exists or null")

	}

	console.log(app.users)
	
})


function has_user(user_name){
	return app.users.indexOf(user_name) != -1
}

app.post('/get_data', function(req, res) {
	if (!app.cnt) app.cnt = 0
	
	var user_name = req.body.user
	
	if (!has_user(user_name))
		res.status(400).send("no_such_username")
	else
  		res.status(200).send("" + app.cnt++%5)
})



app.post('/input_data', function(req, res) {
	var user_name = req.body.user

	var processes = req.body.processes
	if (!has_user(user_name)){
		res.status(400).send("no_such_username")
		return
	}
	console.log(user_name)

	console.log(processes)
	var response_string = ""
	if (!user_name)
		response_string += "no user name"

	if (!processes)
		response_string += "processes invalid"
	
	if (response_string != "")
		res.status(400).send(response_string)
	else
		res.status(200).send("successful")
})


app.listen(port)
console.log('Listening on port '+port)