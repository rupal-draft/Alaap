import express from "express";

const router = express.Router();

import { canDeleteStory, requireSignin } from "../Middleware/verify.js";
import {
  createStory,
  deleteStory,
  likeStory,
  storyFeed,
  unlikeStory,
} from "../Controllers/story.js";

router.post("/create-story", requireSignin, createStory);
router.delete("/delete-story/:id", requireSignin, canDeleteStory, deleteStory);
router.put("/like-story", requireSignin, likeStory);
router.put("/unlike-story", requireSignin, unlikeStory);
router.get("/story-feed", requireSignin, storyFeed);

export default router;
