//This function generates a unique auth key for a given user.
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
function user(username){
	//The auth key
	this.authkey = generate_auth_key()
	
	//The data object.
	this.data = {
		username: username,
		chrome_data: null,
		process_data: null,
		current_cat_state: null,
		database_updated: true
	}

	//Setup update_data
	this.update_data = function(data_json){
		var chrome_data = data_json.chrome_data
		var process_data = data_json.process_data
		var current_cat_state = data_json.current_cat_state
		cnt = 0
		if (chrome_data){
			this.data.chrome_data = chrome_data
			cnt ++
		}
		if (process_data){
			this.data.process_data = process_data
			cnt ++
		}
		if (current_cat_state){
			this.data.current_cat_state = current_cat_state
			cnt ++
		}
		return cnt //keeps track of how many fields are not null (For client.)
	}

	//This gives you the current JSON data.
	this.get_data = function(){
		var data = JSON.stringify(this.data)
		return data
	}
}


module.exports = {
	
	get_user: function(username, init){
		if (!this.data_container)
			this.data_container = {}


		if (!this.data_container[username]){
			if (init)
				this.data_container[username] = new user(username)
			else
				return null
		}

		return this.data_container[username]
	}
}

