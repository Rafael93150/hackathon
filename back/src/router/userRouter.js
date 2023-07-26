import express from "express";
import { getUser, getUsers, updateUser } from "../routes/userRoutes.js";

const router = express.Router();

router.get("/:userId", getUser);
router.get("/", getUsers);
router.put("/:userId", updateUser);

export default router;
