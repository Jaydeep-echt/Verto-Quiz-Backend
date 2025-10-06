// server.js
import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

// Initialize Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Basic health check route
app.get("/", (req, res) => {
  res.send("🚀 Quiz API is running successfully!");
});

// Setup Server & Socket.io
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*", // You can restrict this later
  },
});

// Attach socket logic
io.on("connection", (socket) => {
  console.log("🟢 New socket connected:", socket.id);
  socket.on("disconnect", () => console.log("🔴 Socket disconnected:", socket.id));
});

// Export io if you want to use it in other modules later
export { io };

// Start Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));