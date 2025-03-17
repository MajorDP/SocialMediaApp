const jwt = require("jsonwebtoken");
const User = require("../models/User");
const HttpError = require("../models/HttpError");
const bcrypt = require("bcrypt");
const Chat = require("../models/Chat");

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -friends -requests -token"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.toObject({ getters: true }));
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res, next) => {
  const uid = req.params.uid;

  if (!uid) {
    return next(new HttpError("User ID is missing.", 400));
  }

  let user;

  try {
    user = await User.findById(uid, "username status");
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }
  } catch (error) {
    return next(new HttpError("Could not get user.", 500));
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HttpError("Invalid credentials.", 500));
  }

  if (!EMAIL_REGEX.test(email)) {
    return next(new HttpError("Invalid email.", 400));
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
    email: foundUser.email,
    img: foundUser.img,
    username: foundUser.username,
    votes: foundUser.votes,
    friends: foundUser.friends,
    requests: foundUser.requests,
    mood: foundUser.mood,
    status: foundUser.status,
  };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.json({ accessToken: accessToken });
};

const register = async (req, res, next) => {
  const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const { email, username, password, repeatPassword } = req.body;

  if (!email || !username || !password || !repeatPassword) {
    return next(new HttpError("Invalid credentials.", 400));
  }

  if (!EMAIL_REGEX.test(email)) {
    return next(new HttpError("Invalid email.", 400));
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
    mood: {
      currentMoods: [],
      desc: "",
      lastUpdated: "a",
    },
  });

  try {
    await newUser.save();

    const user = {
      id: newUser._id,
      email: newUser.email,
      img: newUser.img,
      username: newUser.username,
      votes: newUser.votes,
      friends: newUser.friends,
      requests: newUser.requests,
      mood: newUser.mood,
      status: newUser.status,
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken: accessToken });
  } catch (error) {
    return next(new HttpError("Sign up failed, please try again.", 500));
  }
};

const setMood = async (req, res, next) => {
  const { currentMood, desc, uid } = req.body;

  let user;
  try {
    user = await User.findById(uid, "-password");
  } catch (error) {
    return next(new HttpError("Could not get user.", 500));
  }

  user.mood = {
    currentMoods: [currentMood],
    desc: desc || "",
    lastUpdated: new Date(),
  };

  console.log(user.mood);

  try {
    await user.save();
  } catch (error) {
    return next(new HttpError("Could not save user preferences.", 500));
  }

  const userResponse = {
    id: user.id,
    email: user.email,
    img: user.img,
    username: user.username,
    votes: user.votes,
    friends: user.friends,
    requests: user.requests,
    mood: user.mood,
  };
  console.log("userResponse");
  console.log(userResponse);

  res.json({ userResponse });
};

const getFriends = async (req, res, next) => {
  const uid = req.params.uid;
  let existingUser;

  try {
    existingUser = await User.findById(uid, "friends requests")
      .populate("friends", "username img status")
      .populate("requests", "username img");
  } catch (error) {
    return next(new HttpError("Could not get user.", 500));
  }

  res.json({
    friends: existingUser.friends.map((friend) =>
      friend.toObject({ getters: true })
    ),
    requests: existingUser.requests.map((request) =>
      request.toObject({ getters: true })
    ),
  });
};

const sendFriendRequest = async (req, res, next) => {
  const { id, username } = req.body;

  let foundUser;
  let currentUser;
  try {
    currentUser = await User.findById(id, "username");
    foundUser = await User.findOne({ username }).populate("requests");
  } catch (error) {
    return next(new HttpError("Could not find user.", 500));
  }

  if (!foundUser || !currentUser) {
    return next(new HttpError("Could not find user.", 404));
  }

  if (currentUser.username === username) {
    return next(new HttpError("That's you.", 400));
  }

  if (foundUser.requests.find((req) => req.id === id)) {
    return next(new HttpError("Request already sent.", 500));
  }

  try {
    foundUser.requests.push(id);
    await foundUser.save();
  } catch (error) {
    return next(new HttpError("Could not send request.", 500));
  }

  res.json({ message: "Request sent" });
};

const acceptRejectFriendRequest = async (req, res, next) => {
  const { userId, friendId, type } = req.body;

  let currentUser;
  let friend;

  try {
    currentUser = await User.findById(userId);
    friend = await User.findById(friendId);
  } catch (error) {
    return next(new HttpError("Could not find user.", 500));
  }

  if (type === "accept") {
    currentUser.friends.push(friendId);
    friend.friends.push(userId);
    currentUser.requests = currentUser.requests.filter(
      (request) => request.toString() !== friendId
    );

    try {
      await currentUser.save();
      await friend.save();
      await currentUser.populate("requests", "username img");
    } catch (error) {
      return next(new HttpError("Could not add friend.", 500));
    }

    try {
      const newChat = new Chat({
        participants: [userId, friendId],
        messages: [],
        lastMessageDate: new Date().toISOString(),
        seen: true,
      });

      await newChat.save();
    } catch (error) {
      return next(new HttpError("Could not create chat.", 500));
    }

    res.json({
      friends: {
        id: friend.id.toString(),
        username: friend.username,
        img: friend.img,
      },
      requests: currentUser.requests.map((request) =>
        request.toObject({ getters: true })
      ),
    });
  }

  if (type === "reject") {
    currentUser.requests = currentUser.requests.filter(
      (request) => request.toString() !== friendId
    );
    try {
      await currentUser.save();
      await friend.save();
      await currentUser.populate("requests", "username img");
    } catch (error) {
      return next(new HttpError("Could not reject request.", 500));
    }
    res.json({
      friends: null,
      requests: currentUser.requests.map((request) =>
        request.toObject({ getters: true })
      ),
    });
  }
};

const removeFriend = async (req, res, next) => {
  const { currentUserId, friendId } = req.body;

  let currentUser;
  let friend;

  try {
    currentUser = await User.findById(currentUserId);
    friend = await User.findById(friendId);
  } catch (error) {
    return next(new HttpError("Could not find user.", 500));
  }

  if (!currentUser || !friend) {
    return next(new HttpError("User not found.", 404));
  }

  currentUser.friends = currentUser.friends.filter(
    (id) => id.toString() !== friendId
  );
  friend.friends = friend.friends.filter(
    (id) => id.toString() !== currentUserId
  );

  try {
    await currentUser.save();
    await friend.save();
  } catch (error) {
    return next(new HttpError("Could not remove friend.", 500));
  }

  try {
    await Chat.findOneAndDelete({
      participants: { $all: [currentUserId, friendId] },
    });
  } catch (error) {
    return next(new HttpError("Could not delete chat.", 500));
  }

  try {
    const userResponse = await currentUser.populate(
      "friends",
      "img username status"
    );
    res.json({ currentUser: userResponse });
  } catch (error) {
    return next(new HttpError("Could not fetch updated friend list.", 500));
  }
};

const followUnfollowUser = async (req, res, next) => {
  //TODO: Handle following/unfollowing users
};

const updateAccount = async (req, res, next) => {
  const { userData } = req.body;

  let user;

  try {
    user = await User.findById(userData.id);
  } catch (error) {
    return next(new HttpError("Could not find user.", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find user.", 404));
  }

  const isMatch = await bcrypt.compare(userData.confirmPassword, user.password);

  if (!isMatch) {
    return next(new HttpError("Invalid credentials", 422));
  }

  user.img = userData.img || user.img;
  user.email = userData.email || user.email;
  user.username = userData.username || userData.username;
  user.password = userData.password || user.password;
  user.mood = userData.mood || user.mood;

  try {
    await user.save();
  } catch (error) {
    return next(new HttpError("Could not save user data.", 500));
  }

  const userResponse = {
    id: user.id,
    email: user.email,
    img: user.img,
    username: user.username,
    votes: user.votes,
    friends: user.friends,
    requests: user.requests,
    mood: user.mood,
    status: user.status,
  };

  res.json({ userResponse });
};

const updateStatus = async (req, res, next) => {
  const { uid, status } = req.body;

  let user;

  try {
    user = await User.findById(uid);
  } catch (error) {
    return next(new HttpError("Could not find user.", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find user.", 404));
  }

  user.status = status;

  try {
    await user.save();
  } catch (error) {
    return next(new HttpError("Could not change user status.", 500));
  }

  res.json({ success: true, newStatus: status });
};

exports.getCurrentUser = getCurrentUser;
exports.getUser = getUser;
exports.login = login;
exports.register = register;
exports.setMood = setMood;
exports.getFriends = getFriends;
exports.sendFriendRequest = sendFriendRequest;
exports.acceptRejectFriendRequest = acceptRejectFriendRequest;
exports.removeFriend = removeFriend;
exports.followUnfollowUser = followUnfollowUser;
exports.updateAccount = updateAccount;
exports.updateStatus = updateStatus;
