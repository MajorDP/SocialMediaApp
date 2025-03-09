const express = require("express");
const postController = require("../controllers/post-controllers");

const router = express.Router();

router.get("/postedBy/:uid", postController.getPostsByUserId);
router.get("/:pid", postController.getPostById);
router.get("/", postController.getPosts);
router.post("/create", postController.createPost);
router.patch("/edit", postController.editPost);
router.patch("/like/:pid", postController.likePost);
router.patch("/dislike/:pid", postController.dislikePost);
router.patch("/comment/:pid", postController.postComment);

module.exports = router;
