const express = require("express");
const jwt = require("jsonwebtoken");
const verifiToken = require("../../middleware/verifiToken");
const _ = express.Router();
const {
  createBook,
  getAllBooks,
  getSingleBookDetails,
  updateQuantity,
  getAllBooksCount,
  sortingQuantity,
  updateBooks,
} = require("../../controller/Admin/productController");

_.get("/getall-books", verifiToken, getAllBooks);
_.get("/books-count", getAllBooksCount);
_.get("/get-single-book/:id", verifiToken, getSingleBookDetails);
_.post("/create-book", createBook);
_.patch("/update-quantity/:id", updateQuantity);
_.get("/sort-book", sortingQuantity);
_.put("/update-book/:id", updateBooks);

_.delete("/delete-book/:id");
module.exports = _;
