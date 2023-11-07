const express = require("express");
const {
  borrowBook,
  getBorrowBook,
  retrunBook,
} = require("../../controller/User/userController");
const _ = express.Router();
_.get("/get-borrow-book", getBorrowBook);
_.post("/borrow-book", borrowBook);
_.delete("/return-book/:id", retrunBook);
module.exports = _;
