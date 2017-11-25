/* Handles UI of extension, deals with no data */
$(function(){
  $("#whitelist #site-data .slider .slide").click(slider);

  //redirect view taskboard to newer page
  $("#view-blacklist").click(function(){
    chrome.tabs.create({
      url: chrome.extension.getURL("whitelist.html"),
      active: true
    }, function(tab){
      alert("opened tab");
      console.log(tab);
    })
  })


})
