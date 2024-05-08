import express from "express";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  currentUser,
} from "../Controllers/auth.js";
import { requireSignin } from "../Middleware/verify.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/current-user", requireSignin, currentUser);

export default router;
