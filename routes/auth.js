const express = require('express');
const router = express();
const authController = require("../controller/authcontroller");

router.post("/", authController.handleLogin);

module.exports = router;