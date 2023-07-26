import express from "express";
import { insertEvent, getEvents, deleteEvent, updateEvent } from "../routes/calendarRoutes.js";

const router = express.Router();

router.get("/events", getEvents);
router.post("/events", insertEvent);
router.delete("/events/:eventId", deleteEvent);
router.put("/events/:eventId", updateEvent);

export default router;