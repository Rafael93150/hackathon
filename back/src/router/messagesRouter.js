import express from "express";
const router = express.Router();
import {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
    addPointsToMessageSender,
} from "../routes/messagesRoutes.js";

router.get("/", getAllMessages);
router.get("/:messageId", getMessageById);
router.post("/", createMessage);
router.put("/:messageId", updateMessage);
router.delete("/:messageId", deleteMessage);
router.post("/:messageId/addPoints", addPointsToMessageSender);

export default router;
