import express from "express";
import { updateUser } from "../routes/userRoutes.js";

const router = express.Router();

router.put("/:userId", updateUser);

export default router;
