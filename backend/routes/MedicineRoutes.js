import express from "express";
import {
  addMedicine,
  GetSingleMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine
} from "../controllers/MedicineControllers.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Admin only
router.post("/", protect, isAdmin, addMedicine);
router.put("/:id", protect, isAdmin, updateMedicine);
router.delete("/:id", protect, isAdmin, deleteMedicine);

// All logged users
router.get("/", protect, getMedicines);
router.get("/:id", protect, GetSingleMedicine);

export default router;