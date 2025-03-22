const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sentBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  message: { type: String, default: null },
  img: { type: String, default: null },
  dateSent: { type: Date, required: true },
});

const ChatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  messages: [MessageSchema],
  lastMessageDate: { type: String, required: true },
  seen: { type: Boolean, default: false },
  isTemporary: { type: Boolean, default: true },
});

module.exports = mongoose.model("Chat", ChatSchema);
