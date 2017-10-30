$(function(){
  var email = $("#signup #email");
  var password = $("#signup #password");
  var confirm = $("#signup #confirm");

  var msg = $("#signup #error");

  //TODO: change this with proper routes
  if(password != confirm){
    msg.text("Passwords do not match");
  } else {
    var prefix = "http://localhost:3000"; // change this later when on a live server
    $.post(prefix + "/input_data", {

    }, function(data){
      console.log(data);
    })
  }

})
