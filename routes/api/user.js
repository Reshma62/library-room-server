const express = require("express");
const { borrowBook } = require("../../controller/User/userController");
const _ = express.Router();
_.post("/borrow-book", borrowBook);
module.exports = _;
