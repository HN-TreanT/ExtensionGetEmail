const body = document.getElementsByTagName("body");
// const body = document.getElementsByClassName("vY nq");
window.onload = function () {
  const body = document.querySelector(".nH");
  const button = createBtn("kiem tra");
  body.prepend(button);
  console.log("check-->", body);
};
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
  const button = document.createElement("button");
  button.innerHTML = html;
  button.className = "button-check-phishing";
  return button;
}
window.addEventListener("DOMContentLoaded", function (a) {
  const buttonCheck = createBtn("Kiểm tra");
  const butttonCheckStyles = {
    // position: "fixed",
    bottom: "100px",
    left: "300px",
    // backgroundColor: "red",
  };
  Object.assign(buttonCheck.style, butttonCheckStyles);
  for (const bod of body) {
    console.log(bod);
    bod.prepend(buttonCheck);
  }
  buttonCheck.onclick = (e) => {
    collectEmailElements();
  };
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

  // contentEmailElement = emailHeader.innerHTML;
  // console.log(emailHeader);
  // console.log(element);
  // }
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
        model_path: "hoang nam",
        sample_path: "fneuf",
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
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
  //////////////////////
  chrome.runtime.sendMessage({
    type: "html element",
    data: {
      //from: addressEmail[0].getAttribute("email"),
    },
  });
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
