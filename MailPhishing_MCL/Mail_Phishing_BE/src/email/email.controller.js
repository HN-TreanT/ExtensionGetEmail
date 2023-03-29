const Email = require("./email.modal");
const fs = require("fs");
const path = require("path");
const emlformat = require("eml-format");
exports.PostEmail = async (req, res) => {
  const { from, to, subject, body, date } = req.body;
  const currentDate = new Date(date);
  const dateString = currentDate.toLocaleString();
  const emailHtml = `<html><body>${body}</body></html>`;
  let data = {
    from: {
      name: from.name,
      email: from.email,
    },
    to: to,
    subject: subject,
    html: emailHtml,
    headers: {
      Date: dateString,
    },
  };
  const root = path.resolve("../");
  const pathEmail = root + "/Mail_Phshing_Services/email.eml";
  emlformat.build(data, function (error, eml) {
    if (error) return console.log(error);
    fs.writeFileSync(pathEmail, eml);
    console.log("Done!");
    return res.json({
      status: true,
    });
  });
};
