const express = require("express");
const upload = require("../../middleware/multer");
const _ = express.Router();

const {
  createCategory,
  getAllCategory,
  deleteCategory,
} = require("../../controller/Admin/categoryController");

_.get("/getall-category", getAllCategory);
_.post("/create-category", upload.single("image"), createCategory);
_.delete("/delete-category/:id", deleteCategory);
module.exports = _;
