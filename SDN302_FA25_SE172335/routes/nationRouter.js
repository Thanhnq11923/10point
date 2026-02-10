var express = require("express");
var nationRouter = express.Router();
const nationsController = require("../controllers/nationController");
const authMiddleware = require("../middlewares/auth");
nationRouter
  .route("/")
  .get(nationsController.getAllNations)
  .post(nationsController.createNation);
nationRouter
  .route("/:id")
  .get(nationsController.getDetailNation)
  .put(nationsController.updateNation)
  .delete(nationsController.deleteNation);
module.exports = nationRouter;
