import { Router } from "express";
import { createEvent, getEvents } from "../controllers/eventController";
import {
  authenticate,
  authorizeRoles,
} from "../middleware/authMiddleware";

const router = Router();
router.get("/", getEvents);

// Create event - Organizer only
router.post(
  "/",
  authenticate,
  authorizeRoles("ORGANIZER"),
  createEvent
);

export default router;