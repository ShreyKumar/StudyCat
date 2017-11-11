$(function(){
  var whitelist = [];
  var loggedIn = false;
  var prefix = "http://localhost:3000";

  function changeViews(){
    if(localStorage.getItem("user") === null && localStorage.getItem("authkey") === null){
      //not logged in
      console.log("not logged in");
      $("#signup #email, #signup #password, #signup #confirm").val("");
      $("#login #email, #login #password").val("");
      $("#login .error, #register .error").text("");
      $("#signup, #login").show();
      $("#whitelist").hide();
    } else {
      $("#whitelist").show();
      $("#signup, #login").hide();
    }
  }

  function setUser(email, key){
    //shh, don't tell anyone
    var encryptedEmail = CryptoJS.AES.encrypt(email, "studycat");
    var encryptedAuthKey = CryptoJS.AES.encrypt(key, "studycat");

    currentUser = {
      user: encryptedEmail,
      authkey: encryptedAuthKey
    }
    //change local storage of the user

    localStorage.setItem("user", encryptedEmail);
    localStorage.setItem("authkey", encryptedAuthKey);

    changeViews();
    console.log(currentUser);
  }

  function getUser(){
    var name = localStorage.getItem("user");
    var authkey = localStorage.getItem("authkey");

    var decryptedName = CryptoJS.AES.decrypt(name, "studycat");
    var decryptedKey = CryptoJS.AES.decrypt(authkey, "studycat");

    var userName = decryptedName.toString(CryptoJS.enc.Utf8);
    var finalKey = decryptedKey.toString(CryptoJS.enc.Utf8);

    var ret = {
      email: userName,
      authkey: finalKey
    }

    return ret;
  }

  //check for localStorage
  if(typeof(Storage) === "undefined"){
    alert("Sorry you need to use a more updated version of chrome to use this extension");
  }

  changeViews();

  //signout
  $("#whitelist #signout").click(function(){
    $.ajax({
        url : prefix + '/sign_out',
        type: 'POST',
        dataType : "json",
        success: function(data){
          localStorage.removeItem("user");
          localStorage.removeItem("authkey");
          changeViews();
          console.log("Signed out");
        },
        error: function(err){
          if(err.responseText == "Signed out successfully"){
            localStorage.removeItem("user");
            localStorage.removeItem("authkey");
            changeViews();
            console.log("Signed out");
          } else {
            alert("An error occurred! Check console");
            console.log(err);
          }
        }

      })
  })


  //get request on current white list here

  function updateList(lst){
    for(var i = 0; i < lst.length; i++){
      var item = "";
      item += "<div class='list-item'>";
      item += "<span class='text'>" + lst[i] + "</span>";
      item += "<a href='#' class='unmark'>Unmark</a>"
      item += "</div>"

      $("#whitelist .list").append(item);

    }
  }

  function sendServer(lst){
    //get currently signed in user
    var user = getUser();

    var toSend = {
      whitelist: lst
    }

    $.ajax({
        url : prefix + '/write_database',
        type: 'POST',
        dataType : "json",
        headers: {
          "user": user.email
        },
        data: {
          data: {
            "whitelist": lst
          }
        },
        success: function(data){
          console.log(data);
        },
        error: function(err){
          console.log("server error");
          console.log(err);
        }

      })
  }

  $("#whitelist .mark").click(function(){
    var site = prompt("Enter your site");
    if(site != ""){
      //add to whitelist
      whitelist.push(site);
      //update list
      updateList(whitelist);
      //send to server
      sendServer(whitelist);

    }

  })

  $("#whitelist .unmark").click(function(){
    //remove this site
  })


  var same = false;
  $("#signup #password, #signup #confirm").keyup(function(){
    same = $("#signup #password").val() == $("#signup #confirm").val();
    if(!same){
      $("#signup .error").text("Passwords do not match!");
    } else {
      $("#signup .error").text("");
    }

  })

  $("#signup #register").click(function(){
    var email = $("#signup #email").val();
    var password = $("#signup #password").val();

    if(same && email.length != 0 && password.length != 0){
      //send to server
      $.ajax({
          url : prefix + '/sign_up',
          type: 'POST',
          dataType : "json",
          headers: {
            "user": email,
            "password": password
          },
          success: function(data){
            setUser(data.user, data.authkey);
          },
          error: function(err){
            var msg = err.responseText;
            console.log(msg);
            if(msg == "auth/email-already-in-use"){
              $("#signup .error").text("This email is already taken");
            } else if(msg == "auth/invalid-email"){
              $("#signup .error").text("Invalid email");
            } else if(msg == "auth/weak-password"){
              $("#signup .error").text("Password must be at least 6 alpha-numeric characters long");
            } else {
              $("#signup .error").text("Some other error occurred");
            }
          }

        })
    } else {
      $("#signup .error").text("Either the password you entered is empty or passwords don't match");

    }
  })




  $("#login #login_bt").click(function(){
    var loginEmail = $("#login #email").val();
    var loginPwd = $("#login #password").val();

    console.log(loginEmail + " " + loginPwd);

    if(loginEmail.length == 0 || loginPwd.length == 0){
      $("#login .error").text("Please complete all fields!");
    } else {
      $.ajax({
          url : prefix + '/login',
          type: 'POST',
          dataType : "json",
          headers: {
            "user": loginEmail,
            "password": loginPwd
          },
          success: function(authkey){
            setUser(loginEmail, msg);
          },
          error: function(err){
            var msg = err.responseText;
            console.log(msg);
            if(msg == "auth/email-already-in-use"){
              $("#login .error").text("This email is already taken");
            } else if(msg == "auth/invalid-email"){
              $("#login .error").text("Invalid email");
            } else if(msg == "auth/weak-password"){
              $("#login .error").text("Password must be at least 6 alpha-numeric characters long");
            } else if(!msg.includes("/")){ //success case
              setUser(loginEmail, msg);
            } else if(msg == "auth/wrong-password"){
              $("#login .error").text("The password you entered is wrong");
            } else {
              $("#login .error").text("Some other error occurred. Check console");
            }
          }

        })
    }


  })

})
