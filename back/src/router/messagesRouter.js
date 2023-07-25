import express from "express";
const router = express.Router();
import {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
} from "../routes/messagesRoutes.js";

router.get("/", getAllMessages);
router.get("/:messageId", getMessageById);
router.post("/", createMessage);
router.put("/:messageId", updateMessage);
router.delete("/:messageId", deleteMessage);

export default router;
