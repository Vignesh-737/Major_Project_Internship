import express from "express";
import { register, login } from "../controllers/AuthController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/UserSchema.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🔥 ADD THIS BELOW
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;