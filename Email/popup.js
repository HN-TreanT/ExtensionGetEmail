// var port = chrome.runtime.connect({ name: "popup" });
$(document).ready(function () {
  // insertModel();
  // port.postMessage({ type: $("#model-select").find("option[selected]").val() });
  chrome.storage.sync.get(["selectedValue"], function (result) {
    if (result.selectedValue) {
      $("#model-select").val(result.selectedValue);
    }
  });

  $("#model-select").change(function () {
    const selectedValue = $(this).val();
    chrome.storage.sync.set({ selectedValue: selectedValue }, function () {
      //port.postMessage({ type: selectedValue });
    });
  });
});

async function insertModel() {
  await fetch("http://127.0.0.1:6787/api/v1/model/getAllModel", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return ` ${data.data.map((model) => {
        $("#model-select").append(
          `<option class="model-item" value="${model.pathFile}">${model.name}</option>`
        );
      })}
     `;
    });
}
