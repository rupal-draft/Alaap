import express from "express";
import formidable from "express-formidable";
import {
  removeImage,
  removeVideo,
  uploadImage,
  videoUpload,
} from "../Controllers/upload.js";
import { requireSignin } from "../Middleware/verify.js";

const router = express.Router();

router.post(
  "/upload-image",
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.post("/video-upload", formidable(), videoUpload);
router.post("/remove-image", requireSignin, removeImage);
router.post("/video-remove", requireSignin, removeVideo);

export default router;
