chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  chrome.tabs.getSelected(null, function(tab){
    alert(tab.url);
  })
})
