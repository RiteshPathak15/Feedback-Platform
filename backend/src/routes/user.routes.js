import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upgradeToPremium } from "../controllers/user.controllers.js";
import { addFeedback } from "../controllers/feedback.controller.js";
import { getUserProfile } from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/Upgrade-To-Premium", verifyJWT, upgradeToPremium);
router.post("/add-feedback", verifyJWT, addFeedback);
router.get("/profile", verifyJWT, getUserProfile);

export default router;
