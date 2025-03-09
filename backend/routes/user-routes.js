const express = require("express");
const userController = require("../controllers/user-controllers");
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

router.get("/me", authenticateToken, userController.getCurrentUser);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.patch("/preferences", userController.setPreferences);
router.get("/friends/:uid", userController.getFriends);
router.patch("/friends/add", userController.sendFriendRequest);
router.patch("/friends/handle", userController.acceptRejectFriendRequest);
router.patch("/friends/remove", userController.removeFriend);
router.patch("/follow", userController.followUnfollowUser);

module.exports = router;
