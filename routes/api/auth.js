const express = require("express");

const _ = express.Router();
const {
  registerUserController,
} = require("../../controller/Auth/AuthController");
_.post("/register-user", registerUserController);
module.exports = _;
