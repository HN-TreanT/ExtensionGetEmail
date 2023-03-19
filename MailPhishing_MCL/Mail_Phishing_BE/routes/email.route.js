const express = require("express");
const router = express.Router();
const emailController = require("../src/email/email.controller");

router.post("/post_email", emailController.PostEmail);
module.exports = router;
