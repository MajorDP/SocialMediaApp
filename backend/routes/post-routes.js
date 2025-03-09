const express = require("express");
const postController = require("../controllers/post-controllers");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const authenticateToken = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) throw new Error("User not found");

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/postedBy/:uid", postController.getPostsByUserId);
router.get("/:pid", postController.getPostById);
router.get("/", postController.getPosts);
router.post("/create", postController.createPost);
router.patch("/edit", postController.editPost);
router.delete("/delete", authenticateToken, postController.deletePost);
router.patch("/like/:pid", postController.likePost);
router.patch("/dislike/:pid", postController.dislikePost);
router.patch("/comment/:pid", postController.postComment);

module.exports = router;
