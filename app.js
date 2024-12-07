require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Import Routes
const orderRoutes = require("./routes/api/v1/orders");
const authRoutes = require("./routes/api/v1/auth");

const app = express();
const server = http.createServer(app); // HTTP server for Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins, can be restricted to specific domains
    methods: ["GET", "POST"],
  },
});

// Environment Variables
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sneakerslocal";
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// WebSocket: Emit live updates
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Example: Emit a message to the client
  socket.emit("welcome", { message: "Welcome to the WebSocket server!" });

  // Handle client disconnect
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

// Socket.io Middleware to broadcast events
app.use((req, res, next) => {
  req.io = io; // Attach io to req for broadcasting updates
  next();
});

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

// Routes
app.use("/api/v1/orders", orderRoutes); // Order routes
app.use("/api/v1/auth", authRoutes); // Authentication routes

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status: "fail",
    message: err.message,
    data: null,
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});