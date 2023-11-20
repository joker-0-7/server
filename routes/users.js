var express = require("express");
var router = express.Router();
const requireSignIn = require("../middlewares/auth");
const userController = require("../controllers/user.controller");
/* GET users listing. */
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", requireSignIn, userController.currentUser);
module.exports = router;
