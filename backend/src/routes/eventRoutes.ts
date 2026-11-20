import { Router } from "express";
import { createEvent } from "../controllers/eventController";
import {
  authenticate,
  authorizeRoles,
} from "../middleware/authMiddleware";

const router = Router();

// Create event - Organizer only
router.post(
  "/",
  authenticate,
  authorizeRoles("ORGANIZER"),
  createEvent
);

export default router;