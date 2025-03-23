const { default: mongoose } = require("mongoose");
const Chat = require("../models/Chat");
const HttpError = require("../models/HttpError");
const User = require("../models/User");

const sendMessage = async (req, res, next) => {
  const { sentBy, fid, message, image } = req.body;

  if (!sentBy || !fid) {
    return next(new HttpError("Users not found.", 404));
  }

  if (!message && !image) {
    return next(new HttpError("No message to send.", 400));
  }

  let chat;

  try {
    chat = await Chat.findOne({
      participants: { $all: [sentBy, fid] },
    });

    if (!chat) {
      return next(new HttpError("Could not find chat.", 404));
    }
  } catch (error) {
    return next(new HttpError("Could not find chat.", 500));
  }

  chat.messages.push({
    sentBy: sentBy,
    message: message,
    img: image || null,
    dateSent: new Date(),
  });

  try {
    await chat.save();
    await chat.populate({
      path: "messages.sentBy",
      select: "_id username img",
    });
  } catch (error) {
    return next(new HttpError("Could not send message.", 500));
  }

  res.json(chat.toObject({ getters: true }));
};

const getChat = async (req, res, next) => {
  const { uid, fid } = req.query;

  if (!uid || !fid) {
    return next(new HttpError("Could not get user.", 400));
  }

  let chat;

  try {
    chat = await Chat.findOne({
      participants: { $all: [uid, fid] },
    }).populate({ path: "messages.sentBy", select: "_id username img" });

    if (!chat) {
      return next(new HttpError("Could not find chat.", 404));
    }
  } catch (error) {
    return next(new HttpError("Could not find chat.", 500));
  }

  res.json(chat.toObject({ getters: true }));
};

const createTempChat = async (req, res, next) => {
  const { userId, friendId } = req.body;

  //If a chat between matches already exists, we dont create a new one
  let existingChat;
  try {
    existingChat = await Chat.findOne({
      participants: { $all: [userId, friendId] },
    }).populate({ path: "messages.sentBy", select: "_id username img" });

    if (!existingChat) {
      const newChat = new Chat({
        participants: [userId, friendId],
        messages: [],
        lastMessageDate: new Date().toISOString(),
        seen: true,
      });

      await newChat.save();

      res.json({ success: true });
    }
    res.json({ success: true });
  } catch (error) {
    return next(new HttpError("Could not find chat.", 500));
  }
};

const getTempChats = async (req, res, next) => {
  try {
    const { uid } = req.body;

    if (!mongoose.isValidObjectId(uid)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    let chatsWithUser = await Chat.find({
      participants: { $in: [new mongoose.Types.ObjectId(uid)] },
      isTemporary: true,
    })
      .populate("participants", "username img")
      .exec();

    //Deleting the user's expired temporary chats from more than 24 hours ago
    try {
      const expiredDate = new Date();
      expiredDate.setHours(expiredDate.getHours() - 24);
      const expiredChats = chatsWithUser.filter(
        (chat) => chat.dateCreated <= expiredDate
      );

      if (expiredChats.length > 0) {
        await Chat.deleteMany({
          _id: { $in: expiredChats.map((chat) => chat._id) },
        });
        chatsWithUser = chatsWithUser.filter(
          (chat) => chat.dateCreated > expiredDate
        );
      }
    } catch (error) {
      return next(new HttpError("Could not delete expired temporary chats."));
    }

    res.status(200).json({
      chats: chatsWithUser.map((chat) => chat.toObject({ getters: true })),
    });
  } catch (error) {
    return next(new HttpError("Could not get temporary chats."));
  }
};

const removeMessage = async (req, res, next) => {
  //TODO: Handle deleting message from a chat
};

exports.sendMessage = sendMessage;
exports.getChat = getChat;
exports.removeMessage = removeMessage;
exports.createTempChat = createTempChat;
exports.getTempChats = getTempChats;
