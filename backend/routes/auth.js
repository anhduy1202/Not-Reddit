const router = require("express").Router();
const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middleWareController");

//REGISTER
router.post("/register", authController.registerUser);

//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
//LOG IN
router.post("/login", authController.loginUser);
//LOG OUT
router.post("/logout", middlewareController.verifyToken, authController.logOut);
module.exports = router;
