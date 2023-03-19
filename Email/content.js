const body = document.getElementsByTagName("body");
const URL = "https://mail.google.com/mail/u/0/#inbox";
document.addEventListener("click", function (event) {
  //   if (event.target.matches('[role="checkbox"]')) {
  //     console.log("ok");
  //     chrome.runtime.sendMessage({ action: "alert" });
  //   }
  console.log(event.target);
  if (
    event.target.classList.contains("y2") ||
    event.target.classList.contains("yW") ||
    event.target.classList.contains("yP")
  ) {
    chrome.runtime.sendMessage({ action: "ok" });
  }
});
// window.addEventListener("DOMContentLoaded", function (a) {
//   const buttonCheck = createBtn("Kiem tra");
//   for (const bod of body) {
//     bod.prepend(buttonCheck);
//   }
//   buttonCheck.onclick = (e) => {
//     // const elementWrapper = e.target.parentNode;
//     collectEmailElements();
//   };
// });
window.addEventListener("DOMContentLoaded", function (a) {
  const buttonCheck = createBtn("Kiem tra");
  for (const bod of body) {
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

  const bodyEmail = element.children[2];
  console.log("check date email: ", convertDate(date));
  console.log("check subject email-->", subjectEmail);
  console.log("check addressEmail --->", addressEmailUserSend);
  console.log("check name user send mail---->", nameUserSend);
  console.log("check body email --->", bodyEmail.innerHTML);

  // contentEmailElement = emailHeader.innerHTML;
  console.log(emailHeader);
  console.log(element);
  // }
  const data = {
    from: {
      name: nameUserSend,
      email: addressEmailUserSend,
    },
    to: "hntreant@3@gmail.com",
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
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  //////////////////////
  chrome.runtime.sendMessage({
    type: "html element",
    data: {
      //from: addressEmail[0].getAttribute("email"),
    },
  });
}

//function create button
function createBtn(html) {
  const button = document.createElement("button");
  button.innerHTML = html;
  button.className = "btn-clone-post";
  return button;
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
