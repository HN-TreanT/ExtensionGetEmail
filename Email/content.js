const body = document.getElementsByTagName("body");
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
window.addEventListener("DOMContentLoaded", function (a) {
  const buttonCheck = createBtn("Kiem tra");
  for (const bod of body) {
    bod.prepend(buttonCheck);
  }
  buttonCheck.onclick = (e) => {
    collectEmailElements();
    createModalDialog();
    chrome.runtime.sendMessage({
      type: "ok",
    });
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
          .then((data) => {
            console.log(data);
            

          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
  //////////////////////
 
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


function createModalDialog(){
  // const modalDialog = document.createElement('div');
  const modalDialog =`
  <div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>`
  const modalDialogStyle = `
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  
  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }
  
  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }`
  for (const bod of body) {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalDialog;
    bod.appendChild(modalContainer);
    // const style = document.createElement('style');
    // style.innerHTML(modalContainer);
    // bod.appendChild(style);
  }

}