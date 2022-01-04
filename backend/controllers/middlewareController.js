const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");

const middlewareController = {
  verifyToken: (req, res, next) => {
    //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },
  verifyTokenAndUserAuthorization: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id === req.params.id.trim() || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
    });
  },
  verifyTokenAndUserPostAuthorization: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id === req.body.userId || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
    });
  },
  verifyTokenAndCommentAuthorization: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      console.log("req.user.id: " + req.user.id);
      console.log("ownerId: :" + req.body.ownerId);
      if (
        req.user.id === req.body.ownerId ||
        req.user.isAdmin ||
        req.user.id === req.body.postId
      ) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
    });
  },
  verifyTokenAndAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
    });
  },
  paginatedResult: (model) => {
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const byVotes = req.query.hot;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      if (endIndex < (await model.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      try {
        if (page && limit && byVotes) {
          results.results = await model
            .find()
            .sort({ upvotes: -1 })
            .limit(limit)
            .skip(startIndex)
            .exec();
          res.paginatedResults = results;
          next();
        } else {
          results.results = await model
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(startIndex)
            .exec();
          res.paginatedResults = results;
          next();
        }
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  },
  
};

module.exports = middlewareController;
