import { Router } from "express";
import { createBooking } from "../controllers/bookingController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// Create booking - logged-in users only
router.post("/", authenticate, createBooking);

export default router;