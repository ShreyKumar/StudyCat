function generate_auth_key(){
	if (this.times_called === undefined){
		this.times_called = 0
		this.fixedstr = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	}
	this.times_called ++

	str = times_called + ""
	for (var i = 0; i < 30; i++) {
		n = Math.floor(Math.random() * this.fixedstr.length)
		str += this.fixedstr[n]
	}

	return str
}


//Our user class
function user(username, firebase_data){
	
	this.firebase_data = firebase_data
	this.authkey = generate_auth_key()
	this.data = {
		username: username
		chrome_data: null,
		process_data: null,
		current_cat_state: null,
		database_updated: true
	}

	this.update_data = function(chrome_data, process_data, current_cat_state){
		if (chrome_data)
			this.data.chrome_data = chrome_data
		if (process_data)
			this.data.process_data = process_data
		this.data.current_cat_state = current_cat_state
	}

	this.get_data = function(){
		var data = JSON.stringify(this.data)
		return data
	}
}


module.exports = {
	data_container: {},
	
	get_user: function(username, firebase_data){
		if (!data_container[username]){
			if (!firebase_data)
				throw "no user found"
			data_container[username] = new user(username, firebase_data)
		}

		return data_container[username]
	}
}

