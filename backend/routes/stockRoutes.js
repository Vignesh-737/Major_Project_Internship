import express from "express";
import { updateStock, getStockHistory } from "../controllers/stockController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.put("/:id", protect, isAdmin, updateStock);
router.get("/history", protect, isAdmin, getStockHistory);

export default router;