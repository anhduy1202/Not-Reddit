const router = require("express").Router();
const userController = require("../controllers/userController");

//UPDATE A USER
router.put("/:id", userController.updateUser);

//DELETE A USER
router.delete("/:id", userController.deleteUser);

//GET A USER
router.get("/:id", userController.getUser);

//FOLLOW A USER
router.put("/:id/follow", userController.followUser);
//UNFOLLOW A USER
router.put("/:id/unfollow",userController.unfollowUser);

module.exports = router;
