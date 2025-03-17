const { default: mongoose } = require("mongoose");
const HttpError = require("../models/HttpError");
const Post = require("../models/Posts");
const User = require("../models/User");

const createPost = async (req, res, next) => {
  const { post } = req.body;

  const newPost = new Post({
    ...post,
  });

  try {
    await newPost.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Creating post failed, please try again.", 400));
  }

  res.json({ postId: newPost.id });
};

const editPost = async (req, res, next) => {
  const { post } = req.body;

  let existingPost;

  try {
    existingPost = await Post.findById(post.id);
  } catch (error) {
    return next(new HttpError("Could not find post.", 404));
  }

  if (!existingPost) {
    return next(new HttpError("Could not find post.", 404));
  }

  Object.assign(existingPost, post);

  try {
    await existingPost.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Creating post failed, please try again.", 400));
  }

  res.json({ postId: existingPost.id });
};

const getPosts = async (req, res, next) => {
  let posts;
  let user;
  const { filterValue, currentMood, uid } = req.query;

  try {
    user = await User.findById(uid);
    posts = await Post.find()
      .populate("user", "username img")
      .populate("comments.user", "username img");
  } catch (error) {
    return next(new HttpError("Couldn't get posts.", 500));
  }

  if (filterValue === "dashboard") {
    posts = posts.filter((post) => {
      const isFriend = user.friends.includes(post.user._id.toString());
      const matchesMood = post.moods.includes(currentMood);
      const isNotUserPost = post.user._id.toString() !== uid;

      return (matchesMood || isFriend) && isNotUserPost;
    });
  }

  if (filterValue === "explore") {
    posts = posts
      .filter(
        (post) =>
          post.moods.includes(currentMood) && post.user._id.toString() !== uid
      )
      .sort((a, b) => {
        const popularityA = a.comments.length + a.likes;
        const popularityB = b.comments.length + b.likes;

        return popularityB - popularityA;
      });
  }

  res.json(posts.map((post) => post.toObject({ getters: true })));
};

const deletePost = async (req, res, next) => {
  const { pid } = req.body;

  try {
    const deletedPost = await Post.findByIdAndDelete(pid);

    if (!deletedPost) {
      return next(new HttpError("Couldn't find post.", 404));
    }

    res.json({ message: "deleted!" });
  } catch (error) {
    return next(new HttpError("Couldn't delete post.", 500));
  }
};

const getPostsByUserId = async (req, res, next) => {
  const { uid } = req.params;

  let posts;
  try {
    posts = await Post.find({ user: uid })
      .populate("user", "username img")
      .populate("comments.user", "username img");
  } catch (error) {
    return next(new HttpError("Couldn't get posts.", 500));
  }

  res.json(posts.map((post) => post.toObject({ getters: true })));
};

const getPostById = async (req, res, next) => {
  const id = req.params.pid;

  let post;

  try {
    post = await Post.findById(id)
      .populate("user", "username img")
      .populate("comments.user", "username img")
      .exec();
  } catch (error) {
    return next(new HttpError("Couldn't get post.", 500));
  }

  res.json(post.toObject({ getters: true }));
};

const likePost = async (req, res, next) => {
  const postId = req.params.pid;
  const { userId } = req.body;

  let post;
  let user;

  try {
    post = await Post.findById(postId)
      .populate("user", "username img")
      .populate("comments.user", "username img");
    user = await User.findById(userId, "-password");
  } catch (error) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  if (!post || !user) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  const isLiked = user.votes.liked.find((post) => post.toString() === postId);
  const isDisliked = user.votes.disliked.find(
    (post) => post.toString() === postId
  );

  if (isLiked) {
    post.likes = post.likes - 1;
    user.votes.liked = user.votes.liked.filter(
      (post) => post.toString() !== postId
    );
  } else {
    post.likes = isDisliked ? post.likes + 2 : post.likes + 1;
    if (isDisliked) {
      user.votes.disliked = user.votes.disliked.filter(
        (post) => post.toString() !== postId
      );
    }
    user.votes.liked.push(postId);
  }
  await post.save();
  await user.save();

  const userResponse = {
    id: user.id,
    email: user.email,
    username: user.username,
    img: user.img,
    votes: user.votes,
    mood: user.mood,
  };
  res.json({
    post: post.toObject({ getters: true }),
    user: userResponse,
  });
};

const dislikePost = async (req, res, next) => {
  const postId = req.params.pid;
  const { userId } = req.body;

  let post;
  let user;

  try {
    post = await Post.findById(postId)
      .populate("user", "username img")
      .populate("comments.user", "username img");
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  if (!post || !user) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  const isDisliked = user.votes.disliked.find(
    (post) => post.toString() === postId
  );
  const isLiked = user.votes.liked.find((post) => post.toString() === postId);

  if (isDisliked) {
    post.likes += 1;
    user.votes.disliked = user.votes.disliked.filter(
      (id) => id.toString() !== postId
    );
  } else {
    post.likes = isLiked ? post.likes - 2 : post.likes - 1;
    if (isLiked) {
      user.votes.liked = user.votes.liked.filter(
        (post) => post.toString() !== postId
      );
    }
    user.votes.disliked.push(postId);
  }

  await post.save();
  await user.save();

  const userResponse = {
    id: user.id,
    username: user.username,
    img: user.img,
    email: user.email,
    votes: user.votes,
    mood: user.mood,
  };

  res.json({
    post: post.toObject({ getters: true }),
    user: userResponse,
  });
};

const postComment = async (req, res, next) => {
  const pid = req.params.pid;
  const { uid, comment } = req.body;

  let post;
  let user;
  try {
    post = await Post.findById(pid).populate("user", "username img");
    user = await User.findById(uid);
  } catch (error) {
    return next(new HttpError("Couldn't find post or user.", 500));
  }

  const commentObj = {
    user: new mongoose.Types.ObjectId(uid),
    comment: comment,
    datePosted: new Date().toISOString().split("T")[0],
  };

  post.comments.push(commentObj);
  post.save();
  await post.populate("comments.user", "username img");
  res.json(post.toObject({ getters: true }));
};

exports.createPost = createPost;
exports.editPost = editPost;
exports.deletePost = deletePost;
exports.getPosts = getPosts;
exports.getPostsByUserId = getPostsByUserId;
exports.getPostById = getPostById;
exports.likePost = likePost;
exports.dislikePost = dislikePost;
exports.postComment = postComment;
