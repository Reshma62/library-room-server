const express = require("express");
const verifiToken = require("../../middleware/verifiToken");
const {
  borrowBook,
  getBorrowBook,
  retrunBook,
  readBook,
  accessToken,
  deleteToken,
} = require("../../controller/User/userController");

const _ = express.Router();
_.get("/get-borrow-book", verifiToken, getBorrowBook);
_.get("/read-book/:id", readBook);
_.post("/borrow-book", borrowBook);
_.delete("/return-book/:id", retrunBook);

/// token jwt token
_.post("/access-token", accessToken);
_.post("/delete-token", deleteToken);

module.exports = _;
