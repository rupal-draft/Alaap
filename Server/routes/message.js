import express from "express";

import { requireSignin } from "../Middleware/verify.js";
import {
  ImageMessageSend,
  delivaredMessage,
  getFriends,
  messageGet,
  messageSeen,
  messageUploadDB,
} from "../Controllers/message.js";

const router = express.Router();

router.get("/get-friends", requireSignin, getFriends);
router.post("/send-message", requireSignin, messageUploadDB);
router.get("/get-message/:id", requireSignin, messageGet);
router.post("/image-message-send", requireSignin, ImageMessageSend);

router.post("/seen-message", requireSignin, messageSeen);
router.post("/delivared-message", requireSignin, delivaredMessage);

export default router;
