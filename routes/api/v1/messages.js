const express = require("express");
const router = express.Router();
const messagesController = require("../../../controllers/api/v1/messages");

router.post("/", messagesController.create);
router.get("/", messagesController.index);
router.get("/:id", messagesController.getMessageById);
router.put("/:id", messagesController.updateMessage);
router.delete("/:id", messagesController.deleteMessage);
router.get("/", messagesController.getMessagesByUser);

module.exports = router;