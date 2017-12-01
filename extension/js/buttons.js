/* Extra code */
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
/* HANDLES ALL BUTTONS AT THE FRONT OF THE PAGE */
function getWhitelist(){
  console.log(whitelist);
  $.ajax({
    url: prefix + "/get_whitelist",
    type: "GET",
    dataType: "json",
    headers: {
      user: user.email
    },
    success: function(data){
      console.log(data);
    },
    error: function(err){
      console.log(err);
    }
  })
}


$(function(){
  //slider for front page
  $("#whitelist #site-data .slider .slide").click(slider);

  console.log(getUser());
  $("#add-site").click(function(){
    alert("add site");
    console.log($("#site-data .slider").children(".active").index())
    getWhitelist();
  })
  $("#add-page").click(function(){
    alert("add page");
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
