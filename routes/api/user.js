const express = require("express");
const {
  borrowBook,
  getBorrowBook,
} = require("../../controller/User/userController");
const _ = express.Router();
_.get("/get-borrow-book", getBorrowBook);
_.post("/borrow-book", borrowBook);
module.exports = _;
