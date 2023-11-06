const express = require("express");
const _ = express.Router();
const User = require("./user");
const Auth = require("./auth");
const Admin = require("./admin");
_.use("/user", User);
_.use("/auth", Auth);
_.use("/admin", Admin);
module.exports = _;
