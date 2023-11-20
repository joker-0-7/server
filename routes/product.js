const express = require("express");
// const multer = require("multer");
// const upload = multer({ dest: "public/images" });
const requireSignIn = require("../middlewares/auth");
const productController = require("../controllers/product.controller");
const router = express.Router();

router.post("/add", productController.addProduct);

module.exports = router;
