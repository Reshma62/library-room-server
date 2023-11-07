const express = require("express");

const {
  createBook,
  getAllBooks,
  getSingleBookDetails,
  updateQuantity,
  getAllBooksCount,
} = require("../../controller/Admin/productController");
const _ = express.Router();

_.get("/getall-books", getAllBooks);
_.get("/books-count", getAllBooksCount);
_.get("/get-single-book/:id", getSingleBookDetails);
_.post("/create-book", createBook);
_.patch("/update-quantity/:id", updateQuantity);

_.delete("/delete-book/:id");
module.exports = _;
