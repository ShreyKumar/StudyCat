$(function(){
  var whitelist = [];
  var loggedIn = false;
  var prefix = "http://localhost:3000";

  function containsURL(whitelist, url){
    for(var i = 0; i < whitelist.length; i++){
      console.log("Comparing " + whitelist[i]["site"] + " and " + url);
      console.log(whitelist[i]["site"] == url);
      if(whitelist[i]["site"] == url){
        console.log("Found one!");
        console.log(whitelist[i]);
        return whitelist[i];
      }
    }
    return null;
  }

  function extractDomain(domain){
    var hostname;
    if (domain.indexOf("://") > -1) {
        hostname = domain.split('/')[2];
    } else {
        hostname = domain.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
  }
  function removeProtocol(url){
    if(url.includes("http")){
      var splitted = url.split("://");
      return splitted[1];
    } else {
      return url;
    }
  }

  function displayRating(rating){
    $("#site-data .slider .slide").removeClass("active");
    $("#site-data .slider .slide:nth-child(" + rating + ")").addClass("active");
  }


  function loadButtons(whitelist, currentURL){
    var domain = removeProtocol(extractDomain(currentURL));
    var url = removeProtocol(currentURL);

    var containsDomain = containsURL(whitelist, domain);
    var containsHostName = containsURL(whitelist, url);

    if(containsDomain){
      var rating = containsDomain["rating"];
      displayRating(rating);
    } else if(containsHostName){
      var rating = containsHostName["rating"];
      displayRating(rating);
    }

    console.log("Contains only domain?");
    console.log(containsDomain);

    console.log("Contains only hostname?");
    console.log(containsHostName);

    console.log("Contains entire domain?")
    console.log(containsDomain != null && containsHostName == null);

    console.log("Contains entire hostname?");
    console.log(containsDomain != null && containsHostName != null);

    if(containsDomain && !containsHostName){
      //contains the entire domain but not this page
      $("#site-data #add-site").hide();

      $("#site-data #remove-page").hide();
      $("#site-data #add-page").hide();
      $("#site-data #update-page").hide();
      $("#site-data #update-site").show();
      $("#site-data #remove-site").show();


    } else if(!containsDomain && containsHostName){
      //only this page exists, give option to add entire site
      $("#site-data #add-site").show();

      $("#site-data #remove-page").show();
      $("#site-data #add-page").hide();
      $("#site-data #update-page").show();

      $("#site-data #update-site").hide();
      $("#site-data #remove-site").hide();
    } else {
      //doesnt contain any page or site
      $("#site-data #add-site").show();

      $("#site-data #remove-page").hide();
      $("#site-data #add-page").show();
      $("#site-data #update-page").hide();

      $("#site-data #update-site").hide();
      $("#site-data #remove-site").hide();
    }
  }


  function changeViews(){
    window.updated = false;
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

        var currentTab;
        chrome.tabs.getSelected(null, function(tab){
          currentTab = tab.url;
        });

      var isTabSet = setInterval(function(){
        if(currentTab != null){
          $("#site-data .site-url").text(currentTab);

          console.log("using whitelist");
          console.log(whitelist);

          console.log("loading buttons");
          loadButtons(whitelist, currentTab);

          clearInterval(isTabSet);
        }
      }, 100);

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

    //global ifupdated
    window.updated = false;
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
          window.updated = true;
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
            window.updated = true;
          } else {
            console.log(err);
            console.log("error");
          }

        }

      })

      var checking = setInterval(function(){
        if(window.updated){
          console.log("new whitelist after update:");
          console.log(whitelist);
          //stop checking
          clearInterval(checking);
        }
      }, 500);


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

  //signout for both pages
  $("#whitelist #signout, #welcome-links #signout").click(function(){
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

  function updateGlobally(wl, lst){
    wl = lst;
  }

  //get request on current white list here

  function updateList(lst){
    //clear list
    clearWhiteList(false);

    //update global array
    updateGlobally(whitelist, lst);

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
      if(whitelist[i]["site"] == thisItem){
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
        url : prefix + '/write_database',
        type: 'POST',
        dataType : "json",
        headers: {
          "user": user.email
        },
        data: {
          "data": {
            "whitelist": lst
          }
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

  function changeLocally(whitelist, originalSite, newVal){
    //change in whitelist
    for(var i = 0; i < whitelist.length; i++){
      if(whitelist[i]["site"] == originalSite){
        whitelist[i] = newVal;
      }
      console.log("changed into:");
      console.log(whitelist);
    }
  }

  function addLocally(whitelist, newVal){
    whitelist.push(newVal);
  }

  // load synchronously after auto generating elements
  setTimeout(function(){
    $(document).on("click", ".list-item .control-btns .edit-site", function(){
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
    });

    $(document).on("click", ".list-item .control-btns .confirm", function(){
      //check mark
      var btns = $(this).parents(".list-item").children(".control-btns");
      btns.children(".confirm").hide();
      btns.children(".edit-site").show();

      //set site
      var oldSite = $(this).parents(".list-item").children(".text").text();
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

      var newRating = originalEntry.children(".slider").children(".slide.active").index();
      newRating++; // now its 1 indexed


      //change global array
      if(newSite != "" && isURL(newSite)){
        var newEntry = {
          "rating": newRating.toString(),
          "site": newSite
        };
        console.log(newEntry);

        changeLocally(whitelist, oldSite, newEntry);
        console.log("updated list");
        console.log(whitelist);
        updateList(whitelist);

        //send data
        sendServer(whitelist);
        console.log(whitelist);
      } else {
        alert("Invalid Site");
      }


    })

    $(document).on("click", ".list-item .slider .slide", slider);

  }, 500);

  //adding new sites
  $(document).on("click", ".new-site-dummy .mark", function(){
    var newSite = $(".new-site-dummy #name").val();
    var newRating = $(".new-site-dummy .slider .slide.active").index()+1;
    console.log(newRating);

    if(newSite != "" && isURL(newSite)){
      var newEntry = {
        "rating": newRating.toString(),
        "site": newSite
      };
      console.log("new entry");
      console.log(newEntry);
      addLocally(whitelist, newEntry);

      updateList(whitelist);
      sendServer(whitelist);
    } else {
      alert("Please enter a valid site URL");
    }

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
            } else if(msg == "auth/user-not-found"){
              $("#login .error").text("This user doesn't exist");
            } else {
              $("#login .error").text("Some other error occurred. Check console");
            }
          }

        })
    }


  })

})
