exports.validate = function(sender, fb_user, user_name, res) {

	if (!fb_user) { res.status(400).send("you're not signed in"); 
		return 0;
	}

	var fb_username = fb_user.email.split("@")[0];
	if (!user_name) { res.status(400).send("null username"); 
		return 0;
	}
	if (user_name != fb_username) { res.status(400).send("wrong user lul"); 
		return 0;
	}
	
	return 1;
}