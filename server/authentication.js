function sign_up(firebase, email, password, res) {
  var user = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    res.status(400).send(errorCode)

  });
  return user;
}

function sign_in(firebase, email, password, res) {
  var user = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    throw errorCode
  });
  return user;
}

//TODO
function sign_out(firebase, res) {
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  }).catch(function(error) {
  // An error happened.
  });
}



exports.sign_up = sign_up
exports.sign_out = sign_out
exports.sign_in = sign_in