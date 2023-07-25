import express from "express";
import { insertEvent, getEvents, deleteEvent } from "../routes/calendarRoutes.js";

const router = express.Router();

router.post("/events", insertEvent);
router.get("/events", getEvents);
router.delete("/events/:eventId", deleteEvent);

export default router;