import Medicine from "../models/MedicineSchema.js";
import mongoose from "mongoose";

// CREATE
export const addMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//READ ONE
export const GetSingleMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid medicine ID" });
    }

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json(medicine);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};