import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import storyRoutes from "./routes/story.js";
import userRoutes from "./routes/user.js";
import uploadRoutes from "./routes/upload.js";

import morgan from "morgan";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: [process.env.FRONTEND],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type"],
  },
});

app.use(
  cors({
    origin: [process.env.FRONTEND],
  })
);

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR => ", err));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", storyRoutes);
app.use("/api", userRoutes);
app.use("/api", uploadRoutes);

const port = process.env.PORT || 8000;

io.on("connect", (socket) => {
  socket.on("new-post", (newPost) => {
    socket.broadcast.emit("new-post", newPost);
  });
  socket.on("new-follower", (newFollowerData) => {
    socket.broadcast.emit("new-follower", newFollowerData);
  });
  socket.on("new-following", (newFollowingData) => {
    socket.broadcast.emit("new-following", newFollowingData);
  });
  socket.on("new-story", (newStory) => {
    socket.broadcast.emit("new-story", newStory);
  });
  socket.on("new-notification", (newNotification) => {
    socket.broadcast.emit("new-notification", newNotification);
  });
});
http.listen(port, () => console.log(`Server running on port ${port}`));
