require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");
const cors = require("cors");
mongoose.connect("mongodb://localhost:27017").then(() => {
  console.log("SUCCESS TO CONNECT DATABASE");
});
var app = express();
// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public/images")));

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/product", productRouter);
app.use("/uploads", express.static(path.join(__dirname, "public/images")));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  return res
    .status(err.statusCode || 400)
    .json({ status: "ERghfhROR", msg: err.msg });
  console.log(err);
});

module.exports = app;
