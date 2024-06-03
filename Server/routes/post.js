import express from "express";

const router = express.Router();

import { canDeletePost, requireSignin } from "../Middleware/verify.js";
import {
  addComment,
  createPost,
  deletePost,
  getPostComments,
  likePost,
  newsFeed,
  posts,
  postsByUser,
  removeComment,
  unlikePost,
  userPost,
} from "../Controllers/post.js";

router.post("/create-post", requireSignin, createPost);
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-post/:id", requireSignin, userPost);
router.delete("/delete-post/:id", requireSignin, canDeletePost, deletePost);
router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);
router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);
router.get("/all-comments", getPostComments);
router.get("/news-feed", requireSignin, newsFeed);
router.get("/posts", requireSignin, posts);

export default router;
