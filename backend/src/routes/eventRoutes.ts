
import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventTicketTypes,
} from "../controllers/eventController";
import {
  authenticate,
  authorizeRoles,
} from "../middleware/authMiddleware";

const router = Router();
router.get("/", getEvents);
router.get("/:id/tickets", getEventTicketTypes);

// Create event - Organizer only
router.post(
  "/",
  authenticate,
  authorizeRoles("ORGANIZER"),
  createEvent
);

export default router;