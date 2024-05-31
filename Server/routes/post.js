import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import { canDeletePost, requireSignin } from "../Middleware/verify.js";
import {
  addComment,
  createPost,
  deletePost,
  likePost,
  newsFeed,
  posts,
  postsByUser,
  removeComment,
  unlikePost,
  uploadImage,
  userPost,
  videoUpload,
} from "../Controllers/post.js";

router.post("/create-post", requireSignin, createPost);
router.post(
  "/upload-image",
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.post("/video-upload", formidable(), videoUpload);
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-post/:id", requireSignin, userPost);
router.delete("/delete-post/:id", requireSignin, canDeletePost, deletePost);
router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);
router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);
router.get("/news-feed", requireSignin, newsFeed);
router.get("/posts", requireSignin, posts);

export default router;
