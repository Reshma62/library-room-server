const express = require("express");
const upload = require("../../middleware/multer");
const _ = express.Router();

const {
  createCategory,
  getAllCategory,
} = require("../../controller/Admin/adminController");

_.post("/create-category", upload.single("image"), createCategory);
_.get("/getall-category", getAllCategory);
module.exports = _;
