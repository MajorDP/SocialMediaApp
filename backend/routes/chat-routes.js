const express = require("express");
const chatController = require("../controllers/chat-controllers");

const router = express.Router();

router.patch("/send", chatController.sendMessage);
router.get("/get", chatController.getChat);
router.patch("/remove", chatController.removeMessage);
router.post("/createTemp", chatController.createTempChat);
router.post("/getTemp", chatController.getTempChats);

module.exports = router;
