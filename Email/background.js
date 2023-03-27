// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   // if (request.action == "ok") {
//   //   console.log("ok");
//   // }

//   if (request.type == "ok") {
//   }
//   console.log(request);
// });

// chrome.runtime.onConnect.addListener(function (port) {
//   console.log(port);
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { message: "Hello from background!" });
//   });
// });

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == "popup");
  port.onMessage.addListener(function (msg) {
    console.log(msg.type);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: msg.type,
      });
    });
  });
});
