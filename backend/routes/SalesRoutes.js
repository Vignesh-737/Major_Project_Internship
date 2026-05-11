import express from "express";

import {
  createSale
} from "../controllers/SalesController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  createSale
);

export default router;