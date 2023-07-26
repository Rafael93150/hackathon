import express from "express";
import { getUsers, updateUser } from "../routes/userRoutes.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/:userId", updateUser);

export default router;
