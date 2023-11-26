const asyncWreaper = require("../middlewares/asyncWreaper");
const Product = require("../models/product.model");
const appError = require("../utils/appError");
const addProduct = asyncWreaper(async (req, res, next) => {
  const imgs = req.files;
  const imgsUrl = [];
  const { name, description, price, section } = req.body;
  if (!name) {
    const err = appError.create("الاسم مطلوب", 400, "ERROR");
    return next(err);
  }
  if (!description) {
    const err = appError.create("الوصف مطلوب", 400, "ERROR");
    return next(err);
  }
  if (!price) {
    const err = appError.create("السعر مطلوب", 400, "ERROR");
    return next(err);
  }
  if (!section) {
    const err = appError.create("القسم مطلوب", 400, "ERROR");
    return next(err);
  }
  imgs.map((url) => {
    imgsUrl.push({ url: url.filename });
  });
  if (imgsUrl.length < 1) {
    const err = appError.create("يجب اضافة صورة", 400, "ERROR");
    return next(err);
  }
  const newProduct = await Product({
    name,
    description,
    price,
    section,
    imgsUrl,
  });
  try {
    await newProduct.save();
    res.json({ msg: "تم الإضافة بنجاح", newProduct });
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
});
const getProduct = asyncWreaper(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(products);
});
const deleteProduct = asyncWreaper(async (req, res) => {
  const del = await Product.deleteOne({ _id: req.params._id });
  return res.status(200).json({ msg: "تم حذف المنتج " });
});
module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
};
