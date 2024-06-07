import express from "express";
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


io.on("connect", async (socket) => {
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

export { app, http };
