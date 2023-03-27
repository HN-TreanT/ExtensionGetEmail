var port = chrome.runtime.connect({ name: "popup" });
$(document).ready(function () {
  $('input[name="checkbox-model"]').click(function () {
    $('input[name="checkbox-model"]').not(this).prop("checked", false);
  });

  $(".button-select-checkbox").click(function () {
    let selectedValues;
    $('input[name="checkbox-model"]:checked').each(function () {
      if ($(this).val() !== "") {
        // selectedValues.push($(this).val());
        selectedValues = $(this).val();
      }
    });
    // alert(selectedValues);
    // port.postMessage({ status: "ok", type: "modal1" });
    port.postMessage({ type: selectedValues });
  });
});
