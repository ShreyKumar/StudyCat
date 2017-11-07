$(function(){
  chrome.tabs.getSelected(null, function(tab){
    //alert(tab.url);
  });

  var activeTabs = [];
  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        activeTabs.push(tab.url);
      });
    });
  });

  //Post
  var prefix = "http://localhost:3000"; // change this later when on a live server

  var isLoggedIn = false;

  var loggedInUser;
  /*

  setInterval(function(){
    $.get("/currentuser", function(data){
      if(data.users.length != 0){
        isLoggedIn = true;
        loggedInUser = data.users[0];
      }
    })
    console.log(isLoggedIn);
    if(isLoggedIn){
      $.post(prefix + "/input_data", {
        user: loggedInUser,
        proc: activeTabs
      }, function(){
        alert("Success");
      }).fail(function(data){
        console.log(data);
        alert("fail");
      })
    }
  }, 60 * 1000);

  */



}); //end jquery
