import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  upgradeToPremium,
  getUserProfile,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/Upgrade-To-Premium", verifyJWT, upgradeToPremium);
router.get("/profile", verifyJWT, getUserProfile);

export default router;
