import express from "express";
import { requireSignin } from "../Middleware/verify.js";
import {
  addFollower,
  findPeople,
  getUser,
  getUserNotifications,
  profileUpdate,
  removeFollower,
  searchUser,
  userFollow,
  userFollower,
  userFollowing,
  userUnfollow,
} from "../Controllers/user.js";

const router = express.Router();

router.put("/profile-update", requireSignin, profileUpdate);
router.get("/find-people", requireSignin, findPeople);
router.put("/user-follow", requireSignin, addFollower, userFollow);
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow);
router.get("/get/user-followings", requireSignin, userFollowing);
router.get("/get/user-followers", requireSignin, userFollower);
router.get("/search-user/:query", requireSignin, searchUser);
router.get("/user/:name", getUser);
router.get("/notifications", requireSignin, getUserNotifications);

export default router;
