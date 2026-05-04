import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//register
export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;

        const exists=await User.findOne({email})

        if(exists){
            return res.status(400).json({Error:"User Already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(201).json({ message: "User registered" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//login
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})

        if(!user){
            return res.status(400).json({Error:"User not found"});
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({Error:"Credential invalid"});
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }

            
    );
     res.json({
      token,
      user: {
        id: user._id,
        role: user.role
      }
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}