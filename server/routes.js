module.exports = function(app, auth, email, password) {

    // route for logging out
    app.get('/logout', auth.signOut());

    app.get('/login', function(req, res) {
        if (email) { //TODO add code to check if user exists

            auth.signUp(email, password);
            res.status(200).send("Successfully created new user and signed in.")
        } else if (email && password) {
            auth.signIn(email, password);
            res.status(200).send("Successfully signed in.")
        } else {
            res.status(400).send("wot")
        }
        
        app.redirect('/');
    });

};
