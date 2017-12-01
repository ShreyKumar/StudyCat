/*
  REPEATED CODE
  @TODO: Figure out how to fix this
*/
var prefix = "http://localhost:3000";
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

function removeProtocol(url){
  if(url.includes("http")){
    var splitted = url.split("://");
    return splitted[1];
  } else {
    return url;
  }
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
        console.log(err);
      }

    })
}


/* HANDLES ALL BUTTONS AT THE FRONT OF THE PAGE */
function addURL(entry){
  user = getUser();
  console.log(entry);
  var whitelist;
  $.ajax({
    url: prefix + "/get_whitelist",
    type: "GET",
    dataType: "json",
    headers: {
      user: user.email
    },
    success: function(data){
      whitelist = data;
      console.log(whitelist);
    },
    error: function(err){
      console.log(err);
    }
  })

  var whitelistLoaded = setInterval(function(){
    if(whitelist){
      whitelist.push(entry);

      sendServer(whitelist);

      clearTimeout(whitelistLoaded);
    }
  }, 100)

}

function removeURL(entry){
  user = getUser();
  console.log(entry);
  var whitelist;
  $.ajax({
    url: prefix + "/get_whitelist",
    type: "GET",
    dataType: "json",
    headers: {
      user: user.email
    },
    success: function(data){
      whitelist = data;
      console.log(whitelist);
    },
    error: function(err){
      console.log(err);
    }
  })

  var whitelistLoaded = setInterval(function(){
    if(whitelist){
      console.log("whitelist loaded");

      for(var i = 0; i < whitelist.length; i++){
        console.log("Comparing " + whitelist[i]["site"] + " and " + removeProtocol(entry["site"]));
        console.log(removeProtocol(whitelist[i]["site"]) == removeProtocol(entry["site"]));
        if(whitelist[i]["site"] == removeProtocol(entry["site"])){
          whitelist.splice(i, 1); //remove this ith element
        }
      }
      console.log("deleted item");
      console.log(whitelist);

      sendServer(whitelist);

      clearTimeout(whitelistLoaded);
    }
  }, 100)

}

/* @TODO Copied code from post.js, fix this later */
function displayButtons(setting){
  if(setting == "site-added"){
    //contains the entire domain but not this page
    $("#site-data #add-site").hide();

    $("#site-data #remove-page").hide();
    $("#site-data #add-page").hide();
    $("#site-data #update-page").hide();
    $("#site-data #update-site").show();
    $("#site-data #remove-site").show();
  } else if(setting == "page-added"){
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

    //slider
    $("#site-data .slider .slide").removeClass("active");
    $("#site-data .slider .slide:nth-child(3)").addClass("active");
  }
}

$(function(){
  //slider for front page
  $("#whitelist #site-data .slider .slide").click(slider);

  $("#add-site").click(function(){
    //alert("add site");
    var domain = extractDomain($("#site-data .site-url").text());
    var rating = parseInt($("#site-data .slider").children(".slide.active").index())+1;

    var newEntry = {
      "rating": rating.toString(),
      "site": domain
    };


    addURL(newEntry);
    displayButtons("site-added");
  })

  $("#add-page").click(function(){
    var domain = removeProtocol($("#site-data .site-url").text());
    var rating = parseInt($("#site-data .slider").children(".slide.active").index())+1;

    var newEntry = {
      "rating": rating.toString(),
      "site": domain
    };

    addURL(newEntry);
    displayButtons("page-added");
  })

  $("#remove-site").click(function(){
    var domain = extractDomain($("#site-data .site-url").text());
    var rating = parseInt($("#site-data .slider").children(".slide.active").index())+1;

    var newEntry = {
      "rating": rating.toString(),
      "site": domain
    };

    removeURL(newEntry);
    displayButtons("");
  })

  $("#remove-page").click(function(){
    var domain = $("#site-data .site-url").text();
    var rating = parseInt($("#site-data .slider").children(".slide.active").index())+1;

    var newEntry = {
      "rating": rating.toString(),
      "site": domain
    };

    removeURL(newEntry);
    displayButtons("");
  });

  function updateRating(entry){
    user = getUser();
    console.log(entry);
    var whitelist;
    $.ajax({
      url: prefix + "/get_whitelist",
      type: "GET",
      dataType: "json",
      headers: {
        user: user.email
      },
      success: function(data){
        whitelist = data;
        console.log(whitelist);
      },
      error: function(err){
        console.log(err);
      }
    })

    var whitelistLoaded = setInterval(function(){
      if(whitelist){
        console.log("whitelist loaded");

        for(var i = 0; i < whitelist.length; i++){
          console.log("Comparing " + whitelist[i]["site"] + " and " + removeProtocol(entry["site"]));
          console.log(removeProtocol(whitelist[i]["site"]) == removeProtocol(entry["site"]));
          if(whitelist[i]["site"] == removeProtocol(entry["site"])){
            //update rating
            whitelist[i]["rating"] = entry["rating"];
          }
        }
        console.log("updated item");
        console.log(whitelist);

        sendServer(whitelist);

        clearTimeout(whitelistLoaded);
      }
    }, 100)

  }

  $("#update-page, #update-site").click(function(){
    var domain = $("#site-data .site-url").text();
    var rating = parseInt($("#site-data .slider").children(".slide.active").index())+1;

    var newEntry = {
      "rating": rating.toString(),
      "site": domain
    };

    if($(this)[0]["id"] == "update-page"){
      var newEntry = {
        "rating": rating.toString(),
        "site": removeProtocol(domain)
      };
    } else {
      var newEntry = {
        "rating": rating.toString(),
        "site": removeProtocol(extractDomain(domain))
      };
    }

    updateRating(newEntry);
    console.log($(this));


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
