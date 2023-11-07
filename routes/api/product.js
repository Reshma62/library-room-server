const express = require("express");
const upload = require("../../middleware/multer");
const {
  createProduct,
  getAllProducts,
} = require("../../controller/Admin/productController");
const _ = express.Router();

_.get("/getall-product", getAllProducts);
_.post("/create-product", upload.single("image"), createProduct);
_.delete("/delete-product/:id");
module.exports = _;
