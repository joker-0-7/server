const asyncWreaper = require("../middlewares/asyncWreaper");
const Product = require("../models/product.model");
const appError = require("../utils/appError");
const addProduct = asyncWreaper(async (req, res) => {
  const { name, description, price, section } = req.body;
  if (!name) return res.status(400).send("الاسم مطلوب");
  if (!description) {
    return res.status(400).json({ msg: "الوصف مطلوب" });
  }
  if (!price) {
    return res.status(400).json({ msg: "السعر مطلوب" });
  }
  if (!section) {
    return res.status(400).json("القسم مطلوب");
  }
  const newProduct = await Product({ name, description, price, section });
  try {
    await newProduct.save();
    res.json({ msg: "تم الإضافة بنجاح", newProduct });
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
});
module.exports = {
  addProduct,
};
