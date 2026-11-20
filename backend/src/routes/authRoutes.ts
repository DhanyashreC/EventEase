import { Router } from "express";
import { register, login } from "../controllers/authController";
import {
  authenticate,
  authorizeRoles,
} from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Protected route: authenticated user
router.get("/me", authenticate, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Authenticated user",
    user: req.user,
  });
});

// Protected route: Admin only
router.get(
  "/admin-test",
  authenticate,
  authorizeRoles("ADMIN"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin! You have access to this route.",
    });
  }
);

export default router;