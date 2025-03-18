const Chat = require("../models/Chat");
const HttpError = require("../models/HttpError");

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

const removeMessage = async (req, res, next) => {
  //TODO: Handle deleting message from a chat
};

exports.sendMessage = sendMessage;
exports.getChat = getChat;
exports.removeMessage = removeMessage;
