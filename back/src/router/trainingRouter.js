import express from "express";
import { searchVideoGoogleApi  } from "../routes/trainingRoutes.js";

const router = express.Router();

router.get("/search", searchVideoGoogleApi)

export default router;
