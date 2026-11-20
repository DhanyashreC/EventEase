import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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