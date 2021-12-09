const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const userController = require("../controllers/userController");

//UPDATE A USER
router.put("/:id", userController.updateUser);

//DELETE A USER
router.delete("/:id", userController.deleteUser);

//GET A USER
router.get("/:id", userController.getUser);

//FOLLOW A USER
//UNFOLLOW A USER


module.exports = router;
