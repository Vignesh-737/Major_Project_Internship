import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import medicineRoutes from "./routes/MedicineRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";

dotenv.config()
const app=express();

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Backend Running")
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/admin", adminRoutes);



const connectDB=async()=>{
    try {

       await mongoose.connect(process.env.MONGO_URI);
        console.log("MOngoDb Connected")
    
    app.listen(5000,()=>{
    console.log("Server running on port 5000")
    })  
    } catch (error) {
        console.log("Failed!!!  ",error.message)
        process.exit(1);
    }
}

connectDB();
