var express = require("express");
const userController = require("../controllers/userController");
var userrouter = express.Router();
// userrouter.get("/", userController.getAllUser);
userrouter.route("/signin").post(userController.signinUser);
userrouter
  .route("/login")
  .get(userController.showLoginPage)
  .post(userController.login);
module.exports = userrouter;
