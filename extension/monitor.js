$(function(){
  //Post
  var prefix = "http://localhost:3000"; // change this later when on a live server

  setInterval(function(){
    if(localStorage.getItem("user") !== null && localStorage.getItem("authkey") !== null){

      chrome.windows.getAll({populate:true},function(windows){
        var activeTabs = [];

        //get current tab
        var currentTab;
        chrome.tabs.getSelected(null, function(tab){
          currentTab = tab.url;

          //get all active tabs
          windows.forEach(function(window){
            window.tabs.forEach(function(tab){
              activeTabs.push(tab.url);
            });
          });

          //remove current tab from list first
          for(var i = 0; i < activeTabs.length; i++){
            if(activeTabs[i] == currentTab){
              activeTabs.splice(i, 1);
            }
          }

          //insert it back to the front
          activeTabs.unshift(currentTab);

          //decipher
          var encryptedUser = localStorage.getItem("user");
          var encryptedKey = localStorage.getItem("authkey");

          var decryptedUser = CryptoJS.AES.decrypt(encryptedUser, "studycat");
          var decryptedKey = CryptoJS.AES.decrypt(encryptedKey, "studycat");

          var user = decryptedUser.toString(CryptoJS.enc.Utf8);
          var authkey = decryptedKey.toString(CryptoJS.enc.Utf8);


          //send to server
          var toSend = {
            username: user,
            chrome_data: activeTabs,
            process_data: null,
            current_cat_state: null,
            database_updated: true
          }

          //ajax post
          $.ajax({
              url : prefix + '/input_data',
              type: 'POST',
              dataType : "json",
              headers: {
                user: user,
                authkey: authkey
              },
              data: toSend,
              success: function(data){
                console.log("sent");
                console.log(data);
              },
              error: function(err){
                if(err.statusText == "OK"){
                  console.log("sent");
                } else {
                  alert("unable to send data!");
                  console.log(err);
                }
              }

            })

          //console.log("active tabs");
          //console.log(activeTabs);

          //alert(activeTabs);

        });

      }); //end chrome.windows callback
    }
  }, 60 * 1000); //1 minute



}); //end jquery
