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

let users = [];
const addUser = (userId, socketId, userInfo) => {
  const checkUser = users.some((u) => u.userId === userId);

  if (!checkUser) {
    users.push({ userId, socketId, userInfo });
  }
};

const findFriend = (id) => {
  return users.find((u) => u.userId === id);
};

const userRemove = (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
};
const userLogout = (userId) => {
  users = users.filter((u) => u.userId !== userId);
};

io.on("connect", async (socket) => {
  socket.on("addUser", (userId, userInfo) => {
    // console.log(userId);
    addUser(userId, socket.id, userInfo);
    io.emit("getUser", users);

    // const us = users.filter((u) => u.userId !== userId);
    // const con = "new_user_add";
    // for (var i = 0; i < us.length; i++) {
    //   socket.to(us[i].socketId).emit("new_user_add", con);
    // }
  });
  socket.on("sendMessage", (data) => {
    // console.log(data);
    const user = findFriend(data.reseverId);
    // console.log(user);
    if (user !== undefined) {
      socket.to(user.socketId).emit("getMessage", data);
    }
  });

  socket.on("messageSeen", (msg) => {
    // console.log(msg);
    const user = findFriend(msg.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("msgSeenResponse", msg);
    }
  });
  socket.on("seen", (data) => {
    const user = findFriend(data.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("seenSuccess", data);
    }
  });
  socket.on("deliveredMessage", (msg) => {
    const user = findFriend(msg.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("msgDeliveredResponse", msg);
    }
  });

  socket.on("typingMessage", (data) => {
    const user = findFriend(data.reseverId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("typingMessageGet", {
        senderId: data.senderId,
        reseverId: data.reseverId,
        msg: data.msg,
      });
    }
  });
  socket.on("logout", (userId) => {
    userRemove(socket.id);
    userLogout(userId);
    io.emit("getUser", users);
  });

  socket.on("disconnect", () => {
    userRemove(socket.id);
    io.emit("getUser", users);
  });

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
