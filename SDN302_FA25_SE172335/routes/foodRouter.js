var express = require("express");
var foodRouter = express.Router();
const foodController = require("../controllers/foodController");
const authInView = require("../middlewares/authInView");
// const authMiddleware = require("../middlewares/auth");
foodRouter.route("/").get(authInView, foodController.getAllFoods);
foodRouter.route("/:id").get(authInView, foodController.deleteFoodById);
module.exports = foodRouter;
