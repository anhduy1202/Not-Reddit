const router = require("express").Router();
const middlewareController = require("../controllers/middleWareController");
const userController = require("../controllers/userController");

//UPDATE A USER
router.put(
  "/:id",
  middlewareController.verifyTokenAndUserAuthorization,
  userController.updateUser
);

//DELETE A USER
router.delete(
  "/:id",
  middlewareController.verifyTokenAndUserAuthorization,
  userController.deleteUser
);

//GET A USER
router.get("/:id", middlewareController.verifyToken, userController.getUser);

//FOLLOW A USER
router.put(
  "/:id/follow",
  middlewareController.verifyToken,
  userController.followUser
);

module.exports = router;
