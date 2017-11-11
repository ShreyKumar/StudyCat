$(function(){
  //Post
  var prefix = "http://localhost:3000"; // change this later when on a live server

  setInterval(function(){
    //check if user is logged in
    if(localStorage.getItem("user") !== null && localStorage.getItem("authkey") !== null){
      //send to server
      console.log("I am logged in");

      var currentTab;
      chrome.tabs.getSelected(null, function(tab){
        currentTab = tab.url;
      });

      chrome.windows.getAll({populate:true},function(windows){
        var activeTabs = [];
        windows.forEach(function(window){
          window.tabs.forEach(function(tab){
            activeTabs.push(tab.url);
          });
        });

        for(var i = 0; i < activeTabs.length; i++){
          if(activeTabs[i] == currentTab){
            activeTabs.splice(i, 1);
            activeTabs.unshift(currentTab);
          }
        }
        console.log(activeTabs);

        //decipher
        var encryptedUser = localStorage.getItem("user");
        var encryptedKey = localStorage.getItem("authkey");

        var decryptedUser = CryptoJS.AES.decrypt(encryptedUser, "studycat");
        var decryptedKey = CryptoJS.AES.decrypt(encryptedKey, "studycat");

        var user = decryptedUser.toString(CryptoJS.enc.Utf8);
        var authkey = decryptedKey.toString(CryptoJS.enc.Utf8);

        function markTabs(tabs, lst){
          //shared sites
          var markedSites = [];
          for(var i = 0; i < lst.length; i++){
            for(var j = 0; j < tabs.length; j++){
              if(tabs[j].includes(lst[i])){
                markedSites.push(tabs[j]);
              }
            }
          }
          return markedSites;
        }

        function sendTabsServer(user, authkey, markedSites){
          console.log("this is marked sites:");
          console.log(markedSites)

          var toSend = {
            username: user,
            chrome_data: markedSites,
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
                console.log("error");
                console.log(err);
              }

            })
        }

        var whitelist;
        //get whitelist
        $.ajax({
          url : prefix + '/get_whitelist',
          type: 'GET',
          dataType : "json",
          headers: {
            user: user
          },
          success: function(data){
            console.log("found whitelist");
            console.log(data);
            whitelist = data;

            //find shared tabs with whitelist
            var markedTabs = markTabs(activeTabs, whitelist);

            //send to server
            sendTabsServer(user, authkey, markedTabs);
          },
          error: function(err){
            console.log("error");
            console.log(err);
          }
        })



      });

    }
  }, 1000);

  //60 * 1000 = 1 minute


}); //end jquery
