const express = require("express");
const router = express.Router();
const userController = require("../src/users/user.controller");

router.post("/signup", userController.SignUp);

module.exports = router;
