const jwt = require("jsonwebtoken");
const User = require("../models/User");
const HttpError = require("../models/HttpError");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HttpError("Invalid credentials.", 500));
  }

  let foundUser;

  try {
    foundUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError("Sign in failed, please try again.", 500));
  }

  if (!foundUser) {
    return next(new HttpError("Invalid credentials", 422));
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);

  if (!isMatch) {
    return next(new HttpError("Invalid credentials", 422));
  }

  const user = {
    id: foundUser.id,
    img: foundUser.img,
    email: foundUser.email,
    username: foundUser.username,
    votes: foundUser.votes,
  };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.json({ accessToken: accessToken });
};

const register = async (req, res, next) => {
  const { email, username, password, repeatPassword } = req.body;

  if (!email || !username || !password || !repeatPassword) {
    return next(new HttpError("Invalid credentials.", 400));
  }

  if (password !== repeatPassword) {
    return next(new HttpError("Passwords don't match.", 400));
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError("Sign up failed, please try again.", 400));
  }

  if (existingUser) {
    return next(new HttpError("User with this email already exists.", 422));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email: email,
    username: username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    const accessToken = await jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        username: newUser.username,
        votes: newUser.votes,
        friends: newUser.friends,
        requests: newUser.requests,
        preferences: newUser.preferences,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accessToken: accessToken });
  } catch (error) {
    return next(new HttpError("Sign up failed, please try again.", 500));
  }
};

const getFriends = async (req, res) => {
  //TODO: Handle getting friends of current user
};

const sendFriendRequest = async (req, res) => {
  //TODO: Handle sending friend requests
};

const acceptRejectFriendRequest = async (req, res) => {
  //TODO: Handle accepting/rejecting friend requests
};

const removeFriend = async (req, res) => {
  //TODO: Handle removing friends
};

const followUnfollowUser = async (req, res) => {
  //TODO: Handle following/unfollowing users
};

exports.login = login;
exports.register = register;
exports.getFriends = getFriends;
exports.sendFriendRequest = sendFriendRequest;
exports.acceptRejectFriendRequest = acceptRejectFriendRequest;
exports.removeFriend = removeFriend;
exports.followUnfollowUser = followUnfollowUser;
