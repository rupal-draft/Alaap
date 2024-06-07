import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import storyRoutes from "./routes/story.js";
import userRoutes from "./routes/user.js";
import uploadRoutes from "./routes/upload.js";
import messageRoutes from "./routes/message.js";
import { app, http } from "./Socket/index.js";
import morgan from "morgan";
import "dotenv/config";

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
app.use("/api", messageRoutes);

const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server running on port ${port}`));
