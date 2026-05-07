import mongoose from "mongoose";

const MedicineSchema= new mongoose.Schema({
 name: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
  type: Number,
  default: 0
},
  expiryDate: {
    type: Date
  },
  supplier: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Medicine",MedicineSchema)