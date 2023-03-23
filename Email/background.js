
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // if (request.action == "ok") {
  //   console.log("ok");
  // }
  if(request.type == "ok"){
   
  }
  console.log(request);
});
