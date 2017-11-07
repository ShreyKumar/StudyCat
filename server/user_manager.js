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

	return "1"
}


//Our user class
function user(username){
	
	this.authkey = generate_auth_key()
	this.data = {
		username: username,
		chrome_data: null,
		process_data: null,
		current_cat_state: null,
		database_updated: true
	}

	this.update_data = function(chrome_data, process_data, current_cat_state){
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
		return cnt
	}

	this.get_data = function(){
		var data = JSON.stringify(this.data)
		return data
	}
}


module.exports = {
	
	get_user: function(username){
		if (!this.data_container)
			this.data_container = {}

		if (!this.data_container[username]){

			this.data_container[username] = new user(username)
		}

		return this.data_container[username]
	}
}

