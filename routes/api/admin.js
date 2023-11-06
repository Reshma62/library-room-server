const express = require("express");
const upload = require("../../middleware/multer");
const _ = express.Router();

const { createCategory } = require("../../controller/Admin/adminController");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });
_.post("/create-category", upload.single("image"), createCategory);
module.exports = _;
