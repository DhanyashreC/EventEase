import { Router } from "express";
import {
  createBooking,
  getMyBookings,
} from "../controllers/bookingController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, createBooking);
router.get("/my-bookings", authenticate, getMyBookings);

export default router;