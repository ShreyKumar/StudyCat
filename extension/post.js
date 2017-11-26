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
      console.log("changing to whitelist view");
      populateWhiteList();

      //show current tab
      var currentTab;
      chrome.tabs.getSelected(null, function(tab){
        currentTab = tab.url;
        $("#site-data .site-url").text(currentTab);
      });
    }
  }

  function clearWhiteList(hardUpdate){
    if(hardUpdate){
      console.log("hard update");
      whitelist = [];
    }
    $("#whitelist .list").text("");
  }

  function populateWhiteList(){
    //read whitelist from server
    var user = getUser();
    console.log("whitelist");
    $("#whitelist .list").text("Retrieving your whitelist...");

    //update on both views
    $("#whitelist #welcome").text("Welcome " + user.email.split("@")[0] + "!");
    $("#welcomemsg .name").text(user.email.split("@")[0]);
    $.ajax({
        url : prefix + '/get_whitelist',
        type: 'GET',
        dataType : "json",
        headers: {
          user: user.email
        },
        success: function(data){
          whitelist = data;
          updateList(whitelist);
          console.log(data);
          console.log("updated list");
        },
        error: function(err){
          //if response text is nothing still try to update list
          if(err.responseText == "no data to read"){
            console.log("empty list");
            updateList([]);
          } else if(err.responseText != "no data to read" && err.status == 200){
            //1 item found
            console.log("1 item");
            whitelist = [err.responseText];
            updateList(whitelist);
          } else {
            console.log(err);
            console.log("error");
          }

        }

      })
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

  function closeWhiteList(){
    chrome.windows.getAll({populate:true},function(windows){
      var activeTabs = [];
      windows.forEach(function(window){
        window.tabs.forEach(function(tab){
          if(tab.url.includes("whitelist.html")){
            chrome.tabs.remove(tab.id, function(){
              console.log("closed");
            })
          }
        });
      });
    });
  }

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
          clearWhiteList(true);
          closeWhiteList();
          console.log("Signed out");
        },
        error: function(err){
          if(err.responseText == "Signed out successfully"){
            localStorage.removeItem("user");
            localStorage.removeItem("authkey");
            changeViews();
            clearWhiteList(true);
            closeWhiteList();
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
    //clear list
    clearWhiteList(false);

    if(lst.length == 0){
      $("#whitelist .list").text("Nothing to show");
    } else {

      var slider = '';
      slider += '<div class="slider">';
      slider += '<div class="slide"></div>';
      slider += '<div class="slide"></div>';
      slider += '<div class="slide active"></div>';
      slider += '<div class="slide"></div>';
      slider += '<div class="slide"></div>';
      slider += '</div>';

      var ctrlbtns = '';
      ctrlbtns += "<div class='control-btns'>";
      ctrlbtns += "<a href='#' class='unmark'><i class='fa fa-trash-o'></i></a>";
      ctrlbtns += "<a href='#' class='edit-site'><i class='fa fa-pencil'></i></a>";
      ctrlbtns += "<a href='#' class='confirm'><i class='fa fa-check'></i></a>";
      ctrlbtns += "</div>";

      var addbtns = '';
      addbtns += "<div class='control-btns'>";
      addbtns += "<a href='#' class='reset'><i class='fa fa-times'></i></a>";
      addbtns += "<a href='#' class='mark'><i class='fa fa-check'></i></a>";
      addbtns += "</div>";


      for(var i = 0; i < lst.length; i++){
        var item = "";
        item += "<div class='list-item'>";
        item += "<div class='text'>" + lst[i]["site"] + "</div>";

        //add fields
        item += "<input type='text' class='confirm-edit' value='' />";

        item += "<div class='rating'>Rating: <span class='num'>" + lst[i]["rating"] + "</span></div>";
        item += ctrlbtns;

        item += slider + "</div>";

        $("#whitelist .list").prepend(item);
      }

      //find a better way to do this later
      //add dummy
      var dummy = "";
      dummy += "<div class='list-item new-site-dummy on-edit'>";
      dummy += "<input type='text' id='name' placeholder='Enter your site'>";
      dummy += "<div class='rating'>Rating: <span class='num'>3</span></div>";
      dummy += addbtns;
      dummy += slider;
      dummy += "</div>";
      $("#whitelist .list").prepend(dummy);

      //$("#whitelist .list .new-site-dummy").hide();

      //properly add unmark listeners
      listeners = $(".list-item .control-btns .unmark i");
      listeners.click(unMark);

    }

  }

  function unMark(){
    var thisItem = $(this).parents(".list-item").children(".text").text();

    for(var i = 0; i < whitelist.length; i++){
      if(whitelist[i] == thisItem){
        whitelist.splice(i, 1);
        updateList(whitelist);
        sendServer(whitelist);
      }
    }

    //alert("clicked me");
  }

  function sendServer(lst){
    //get currently signed in user
    var user = getUser();

    $.ajax({
        url : prefix + '/update_whitelist',
        type: 'POST',
        dataType : "json",
        headers: {
          "user": user.email
        },
        data: {
          "whitelist": lst
        },
        success: function(data){
          console.log(data);
        },
        error: function(err){
          if(err.responseText == "done"){
            console.log("finished");
          }
        }

      })
  }

  function isURL(url){
    var isURL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(isURL);

    return url.match(regex);
  }

  // load synchronously after auto generating elements
  setTimeout(function(){
    $(".list-item .control-btns .edit-site i").click(function(){
      var originalEntry = $(this).parents(".list-item");
      originalEntry.addClass("on-edit");

      var originalSiteElement = originalEntry.children(".text");
      var originalSite = originalSiteElement.text();

      var originalRatingElement = originalEntry.children(".num");
      var originalRating = originalRatingElement.text();

      //name
      originalEntry.children(".confirm-edit").show();
      originalEntry.children(".confirm-edit").val(originalSite);
      originalEntry.children(".text").hide();

      //check mark
      var btns = $(this).parents(".list-item").children(".control-btns");
      btns.children(".edit-site").hide();
      btns.children(".confirm").show();

      //show slider
      originalEntry.children(".slider").show();

      //set slider
      var numRating = originalEntry.children(".rating").children(".num").text();

      var selectedSlide = originalEntry.children(".slider").children(".slide:nth-child(" + numRating + ")");
      selectedSlide.parents(".slider").children(".slide").removeClass("active");
      selectedSlide.addClass("active");

    })

    function getSelectedSlide(parent){
      return parent.children(".slider").children(".slide.active").index();
    }

    function changeLocally(originalSite, newVal){
      //change in whitelist
      for(var i = 0; i < whitelist.length; i++){
        if(whitelist[i]["site"] == originalSite){
          whitelist[i] = newVal;
        }
      }
    }

    $(".list-item .control-btns .confirm i").click(function(){
      //check mark
      var btns = $(this).parents(".list-item").children(".control-btns");
      btns.children(".confirm").hide();
      btns.children(".edit-site").show();

      //set site
      var originalEntry = $(this).parents(".list-item");
      var newSite = originalEntry.children(".confirm-edit").val();

      //edit
      originalEntry.removeClass("on-edit");

      originalEntry.children(".confirm-edit").hide();
      originalEntry.children(".confirm-edit").val("");

      originalEntry.children(".text").show();
      originalEntry.children(".text").text(newSite);

      //hide and set slider
      originalEntry.children(".slider").hide();

      var newRating = getSelectedSlide(originalEntry);
      newRating++; // now its 1 indexed


      //change global array
      if(newSite != "" && isURL(newSite)){
        var newEntry = {
          "site": newSite,
          "rating": newRating
        };
        var oldSite = $(".list-item.on-edit .text").text();
        changeLocally(oldSite, newEntry);
        updateList(whitelist);

        //send data
        sendServer(whitelist);
        console.log(whitelist);
      } else {
        alert("Invalid Site");
      }


    })

    $(".list-item .slider .slide").click(function(){
      var newSelected = $(this).index()+1;
      $(this).parents(".list-item").children(".rating").children(".num").text(newSelected);
    })

  }, 250);

  function editSite(){
    var originalSite = $(this).parents(".list-item").children(".text").text();
    var site = prompt("Enter your site", originalSite);

    if(site){
      if(isURL(site)){



        //update list
        console.log("update array");
        //send to server
      } else {
        alert("Invalid Site");
      }

    } else {
      alert("Please enter a site name");
    }

  }

  $("#whitelist .mark").click(function(){
    var site = prompt("Enter your site");
    if(site){
      if(isURL(site)){

        //add to whitelist
        whitelist.push(site);
        //update list
        console.log("update array");
        console.log(whitelist);
        updateList(whitelist);
        //send to server
        sendServer(whitelist);
      } else {
        alert("Invalid Site");
      }

    } else {
      alert("Please enter a site name");
    }

  })

  $("#whitelist .unmark i").click(function(){
    //remove this site
    console.log("clicked this site");
    console.log($(this));
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
            changeViews();
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
            setUser(loginEmail, authkey);
            changeViews();
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
              changeViews();
            } else if(msg == "auth/wrong-password"){
              $("#login .error").text("The password you entered is wrong");
            } else {
              $("#login .error").text("Some other error occurred. Check console");
            }
          }

        })
    }


  })

  //single page whitelist window
  $("#add-site").click(function(){
    console.log($("#site-data .slider").children(".active").index())
  })

})
