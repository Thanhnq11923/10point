var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//1.import mongoose
var mongoose = require("mongoose");

//1.nạp express-session
const session = require("express-session");

//1.nạp dotenv config
require("dotenv").config();

var indexRouter = require("./routes/index");

//1. nạp router
const nationRouter = require("./routes/nationRouter");
const userRouter = require("./routes/userRouter");
const foodRouter = require("./routes/foodRouter");

var app = express();

//1.kết nối mongodb
const uri = process.env.MONGO_URI;
const connect = mongoose.connect(uri);
connect.then(() => {
  console.log("Connected correctly to server");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));

//1. jade ---> ejs
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//1.đặt nằm trên các portname cấu hình cho express-session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use("/", indexRouter);

//1. sử dụng router
app.use("/api/v1/nations", nationRouter);
app.use("/auth", userRouter);
app.use("/page/foods", foodRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
