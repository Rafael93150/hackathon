import Message from "../models/message.js";
import { addPoints } from "../services/pointsService.js";

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({
            message:
                "Une erreur est survenue lors de la récupération des messages.",
        });
    }
};

export const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message) {
            return res.status(404).json({ message: "Message non trouvé." });
        }
        res.json(message);
    } catch (err) {
        res.status(500).json({
            message:
                "Une erreur est survenue lors de la récupération du message.",
        });
    }
};

export const createMessage = async (req, res) => {
    try {
        const { fromUser, toUser, text, images, files } = req.body;
        const newMessage = new Message({
            fromUser,
            toUser,
            text,
            images,
            files,
        });
        const savedMessage = await newMessage.save();
        io.emit("newMessage", savedMessage);
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(500).json({
            message: "Une erreur est survenue lors de l'envoi du message.",
        });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const { text } = req.body;

        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.messageId,
            { text },
            { new: true }
        );
        if (!updatedMessage) {
            return res.status(404).json({ message: "Message non trouvé." });
        }
        res.json(updatedMessage);
    } catch (err) {
        res.status(500).json({
            message:
                "Une erreur est survenue lors de la mise à jour du message.",
        });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndRemove(
            req.params.messageId
        );
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message non trouvé." });
        }
        res.json({ message: "Message supprimé avec succès." });
    } catch (err) {
        res.status(500).json({
            message:
                "Une erreur est survenue lors de la suppression du message.",
        });
    }
};

export const addPointsToMessageSender = async (req, res) => {
    try {
        const pointsToAdd = 50;
        const message = await Message.findById(req.params.messageId);
        if (!message) {
            return res.status(404).json({ message: "Message non trouvé." });
        }
        addPoints(message.fromUser, pointsToAdd);
        res.json({ message: `L'employé a reçu ${pointsToAdd} points` });
    } catch (err) {
        res.status(500).json({
            message: `Une erreur est survenue lors de l'ajout des points: ${err}`,
        });
    }
};
