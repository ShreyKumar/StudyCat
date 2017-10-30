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

  alert("post");

  $.post(prefix + "/input_data", {
    user: "user name",
    proc: activeTabs
  }, function(){
    alert("Success");
  }).fail(function(data){
    console.log(data);
    alert("fail");
  })


}); //end jquery
