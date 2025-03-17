const Chat = require("../models/Chat");
const HttpError = require("../models/HttpError");

const sendMessage = async (req, res, next) => {
  //TODO: Handle sending messages in chat
};

const getChat = async (req, res, next) => {
  const { uid, fid } = req.query;
  console.log(uid, fid);
  if (!uid || !fid) {
    return next(new HttpError("Could not get user.", 400));
  }

  let chat;

  try {
    chat = await Chat.findOne({
      participants: [uid, fid],
    });

    if (!chat) {
      return next(new HttpError("Could not find chat.", 404));
    }
  } catch (error) {
    return next(new HttpError("Could not find chat.", 500));
  }
  console.log(chat);
  res.json(chat);
};

const removeMessage = async (req, res, next) => {
  //TODO: Handle deleting message from a chat
};

const createChat = async (req, res, next) => {
  //TODO: Handle creating a when a user accepts a friend request
};

const deleteChat = async (req, res, next) => {
  //TODO: Handle deleting a whole chat between two users
};

exports.sendMessage = sendMessage;
exports.getChat = getChat;
exports.removeMessage = removeMessage;
exports.createChat = createChat;
exports.deleteChat = deleteChat;
