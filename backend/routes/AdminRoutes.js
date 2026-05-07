import express from "express";
import {
  getUsers,
  updateRole
} from "../controllers/AdminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getUsers);

router.put("/role/:id", protect, isAdmin, updateRole);

export default router;