const express = require("express");
const router = express.Router();
const modelController = require("../src/models/model.controller");
router.get("/getAllModel", modelController.getAllModel);
router.post("/postModel", modelController.postModel);
module.exports = router;
