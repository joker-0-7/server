const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncWreaper = require("../middlewares/asyncWreaper");
const appError = require("../utils/appError");

const register = asyncWreaper(async (req, res, next) => {
  const exist = await User.exists({ email: req.body.email });
  if (exist) {
    const err = appError.create("Email Is Token", 404, "ERROR");
    return next(err);
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User(req.body);
  newUser.password = hashPassword;
  await newUser.save();
  return res.status(201).json({ msg: "seccess" });
});

const login = async (req, res, next) => {
  const existEmail = await User.exists({ email: req.body.email });
  if (!existEmail) {
    const err = appError.create("Email Is Invalid", 404, "ERROR");
    return next(err);
  }
  const user = await User.findById(existEmail._id);
  const comparePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!comparePassword) {
    return res.status(404).json({ msg: "Password Error" });
  }
  const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  user.password = undefined;
  return res.status(200).json({ msg: "Hello User", user, token });
};
const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    res.json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
module.exports = {
  register,
  login,
  currentUser,
};
