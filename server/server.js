const port = 3000;
const express = require('express');
const body_parser = require("body-parser");
const app = express();


app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());


app.post('/get_data', function(req, res) {
	if (!app.cnt) app.cnt = 0
	
	var user_name = req.body.user
	
	if (!user_name)
		res.status(400).send("no_username")
	else
  		res.status(200).send("" + app.cnt++%5);
});



app.post('/input_data', function(req, res) {
	var user_name = req.body.user

	var processes = req.body.processes

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
});


app.listen(port);
console.log('Listening on port '+port);