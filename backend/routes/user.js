const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

//UPDATE A USER
router.put("/:id", verifyTokenAndUserAuthorization, userController.updateUser);

//DELETE A USER
router.delete("/:id", verifyTokenAndUserAuthorization, userController.deleteUser);

//GET A USER
router.get("/:id", verifyToken, userController.getUser);

//FOLLOW A USER
router.put("/:id/follow", verifyToken, userController.followUser);
//UNFOLLOW A USER
router.put("/:id/unfollow", verifyToken, userController.unfollowUser);

module.exports = router;
