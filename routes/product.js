const express = require("express");
const multer = require("multer");
const requireSignIn = require("../middlewares/auth");
const productController = require("../controllers/product.controller");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router
  .route("/add")
  .post(requireSignIn, upload.array("img"), productController.addProduct);

router.get("/get-products", requireSignIn, productController.getProduct);
router.delete("/delete/:_id", requireSignIn, productController.deleteProduct);

module.exports = router;
