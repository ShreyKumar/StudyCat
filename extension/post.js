$(function(){
  var email = $("#signup #email");
  var password = $("#signup #password");
  var confirm = $("#signup #confirm");

  var prefix = "http://localhost:3000"; // change this later when on a live server

  var msg = $("#signup #error");

  if(password != confirm){
    msg.text("Passwords do not match");
  } else {
    $.post(prefix + "/input_data", {

    }, function(data){
      console.log(data);
    })
  }


  var userName = $("#login #email");
  var password = $("#login #password");

  $("#login #login_bt").click(function(){
    alert("login clicked");
    $.post(prefix + "/login", {
      user: userName
    }, function(){
      console.log("logged in");
      alert("logged in");
    }).fail(function(){
      alert("failed");
    })
  })

})
