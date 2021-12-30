const middlewareController = require("../controllers/middleWareController");
const newsController = require("../controllers/newsController");

const router = require("express").Router();

//GET NEWS
router.get("/", middlewareController.verifyToken, newsController.getHotNews);

module.exports = router;