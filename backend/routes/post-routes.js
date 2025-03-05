const express = require("express");
const postController = require("../controllers/post-controllers");

const router = express.Router();

router.get("/:pid", postController.getPostById);
router.get("/", postController.getPosts);
router.patch("/like/:pid", postController.likePost);
router.patch("/dislike/:pid", postController.dislikePost);
router.patch("/comment/:pid", postController.postComment);

module.exports = router;
