/* Handles UI of extension, deals with no data */
$(function(){
  $(".slider .slide").click(function(){
    alert("clicked");
    $(this).parent().children(".active").removeClass("active");
    //$(".slider .slide.active").removeClass("active");
    $(this).addClass("active");
  })

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
