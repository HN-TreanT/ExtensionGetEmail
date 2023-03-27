const body = document.getElementsByTagName("body");
var typeModel;
// const body = document.getElementsByClassName("vY nq");
// window.onload = function () {
//   const body = document.querySelector(".nH");
//   const button = createBtn("kiem tra");
//   body.prepend(button);
//   console.log("check-->", body);
// };
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log(msg.type);
  typeModel = msg.type;
});

const URL = "https://mail.google.com/mail/u/0/#inbox";
document.addEventListener("click", function (event) {
  console.log(event.target);
  if (
    event.target.classList.contains("y2") ||
    event.target.classList.contains("yW") ||
    event.target.classList.contains("yP")
  ) {
    chrome.runtime.sendMessage({ action: "ok" });
  }
});
//function create button
function createBtn(html) {
  // const button = document.createElement("button");
  // button.innerHTML = html;
  // button.className = "button-check-phishing";
  // return button;
  const ButtonCheck = `
  <div id="button-check-email">Kiem tra</div> 
  `;
  for (const bod of body) {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = ButtonCheck;
    bod.appendChild(buttonContainer);
  }
}

window.addEventListener("popstate", function () {
  // if (window.location.href !== "https://mail.google.com/mail/u/0/#inbox") {
  //   const modalContainer = document.getElementById("modal-container");
  //   modalContainer.style.display = "block";
  //   collectEmailElements();
  // }
  const hash = window.location.hash.substring(1);
  if (
    (hash.startsWith("inbox/") && hash.substring(6) !== null) ||
    (hash.startsWith("all/") && hash.substring(4) !== null) ||
    (hash.startsWith("spam/") && hash.substring(5) !== null)
  ) {
    collectEmailElements();
  }
});

window.addEventListener("DOMContentLoaded", function (a) {
  createModalDialog();
  console.log(window.location.href);
});

function collectEmailElements() {
  let contentEmailElement;
  const emailHeader = document.getElementsByClassName("gE iv gt")[0];
  //for (const emailHeader of emailHeaders) {
  const element = emailHeader.parentElement;
  //get address email user send  email
  const addressEmailUserSend = emailHeader
    .getElementsByClassName("gD")[0]
    .getAttribute("email");
  const nameUserSend = emailHeader
    .getElementsByClassName("gD")[0]
    .getAttribute("name");
  // get subject email
  const subjectEmail = document
    .getElementsByClassName("nH V8djrc byY")[0]
    .getElementsByClassName("nH")[0]
    .getElementsByClassName("ha")[0]
    .getElementsByTagName("h2")[0].innerHTML;
  //get date
  const date = emailHeader
    .getElementsByClassName("gH bAk")[0]
    .getElementsByClassName("gK")[0]
    .getElementsByClassName("g3")[0]
    .getAttribute("title");
  //get body email
  const bodyEmail = element.children[2];
  //get address email user recieved
  const addressEmailUserRecieved = emailHeader
    .getElementsByClassName("iw ajw")[0]
    .getElementsByTagName("span")[1]
    .getAttribute("email");
  // console.log("check date email: ", convertDate(date));
  // console.log("check subject email-->", subjectEmail);
  // console.log("check addressEmail --->", addressEmailUserSend);
  // console.log("check name user send mail---->", nameUserSend);
  // console.log("check body email --->", bodyEmail.innerHTML);
  // console.log("check name user receive mail--->", addressEmailUserRecieved);

  const data = {
    from: {
      name: nameUserSend,
      email: addressEmailUserSend,
    },
    to: addressEmailUserRecieved,
    subject: subjectEmail,
    body: bodyEmail.innerHTML,
    date: convertDate(date),
  };

  ///goi APi
  fetch("http://localhost:6787/api/v1/email/post_email", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const path = {
        type: typeModel ? typeModel : "model1",
      };
      if (data.status) {
        fetch("http://localhost:6777/inference", {
          method: "POST",
          body: JSON.stringify(path),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // if (data === 1) {
            //   //  createModalDialog();
            //   const modalContainer = document.getElementById("modal-container");
            //   modalContainer.style.display = "block";
            // }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
  //////////////////////
}

function convertDate(dateString) {
  // Tách thông tin về giờ, phút, ngày, tháng và năm từ chuỗi
  let [timeString, day, thg, month] = dateString.split(" ");
  let [hour, minute] = timeString.split(":");
  let year = 2023;
  let date = new Date(
    year,
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute)
  );
  return date;
}
function createModalDialog() {
  const modealDialog = `
  <div id="modal-container" class="">
  <div id="modal-content">
    <h2 class="modal-dialog-title">Warning!</h2>
    <p>This email is dangerous, be aware!</p>
    <button id="close-modal">Close</button>
    <button id="back-to-page">Quay lại</button>
  </div>
</div>`;
  for (const bod of body) {
    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = modealDialog;
    bod.appendChild(modalContainer);
  }
  const buttonClose = document.getElementById("close-modal");
  const buttonBack = document.getElementById("back-to-page");
  const modalContainer = document.getElementById("modal-container");
  buttonClose.onclick = () => {
    modalContainer.style.display = "none";
  };
  buttonBack.onclick = () => {
    modalContainer.style.display = "none";
    window.location.href = "https://mail.google.com/mail/u/0/#inbox";
  };
}
