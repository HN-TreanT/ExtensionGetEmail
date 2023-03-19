chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // if (request.action == "ok") {
  //   console.log("ok");
  // }
  console.log(request);
});
