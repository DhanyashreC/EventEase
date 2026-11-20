import bookingRoutes from "./routes/bookingRoutes";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to EventEase API 🎉",
    status: "Server is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "EventEase backend is healthy"
  });
});

export default app;