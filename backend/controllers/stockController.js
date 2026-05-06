import Medicine from "../models/MedicineSchema.js";
import StockLog from "../models/StockLogs.js";
import mongoose from "mongoose";

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, type } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid medicine ID" });
    }

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    let newQuantity = medicine.quantity;

    if (type === "ADD") {
      newQuantity += quantity;
    } 
    else if (type === "REMOVE") {
      if (medicine.quantity < quantity) {
        return res.status(400).json({ error: "Insufficient stock" });
      }
      newQuantity -= quantity;
    } 
    else {
      return res.status(400).json({ error: "Invalid type (ADD or REMOVE only)" });
    }

    medicine.quantity = newQuantity;
    await medicine.save();

    await StockLog.create({
      medicineId: id,
      change: quantity,
      type,
      updatedBy: req.user.id
    });

    res.json({
      message: "Stock updated successfully",
      quantity: medicine.quantity
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getStockHistory = async (req, res) => {
  try {
    const logs = await StockLog.find()
      .populate("medicineId", "name")
      .populate("updatedBy", "name")
      .sort({ createdAt: -1 });

    res.json(logs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};