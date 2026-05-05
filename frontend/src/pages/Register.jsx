import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiHash } from "react-icons/fi";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/register", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">

      {/* Background */}
      <img
        src="/bg_image.png"
        alt="bg"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute w-full h-full bg-black/20 backdrop-blur-sm"></div>

      {/* Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-[380px]"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">
            PharmaStock
          </h1>
          <p className="text-lg font-bold text-black pt-3">
            Create your account
          </p>
        </div>

        {/* Name */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Name</label>
          <div className="flex items-center border rounded-lg px-2 mt-1">
            <FiUser className="text-gray-400" />
            <input
              className="w-full p-2 outline-none"
              placeholder="Enter name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Employee ID */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Employee ID</label>
          <div className="flex items-center border rounded-lg px-2 mt-1">
            <FiHash className="text-gray-400" />
            <input
              className="w-full p-2 outline-none"
              placeholder="Enter ID"
              onChange={(e) =>
                setForm({ ...form, employeeId: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Email</label>
          <div className="flex items-center border rounded-lg px-2 mt-1">
            <FiMail className="text-gray-400" />
            <input
              type="email"
              className="w-full p-2 outline-none"
              placeholder="Enter email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>
          <div className="flex items-center border rounded-lg px-2 mt-1">
            <FiLock className="text-gray-400" />
            <input
              type="password"
              className="w-full p-2 outline-none"
              placeholder="Enter password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Register
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-3">
            {error}
          </p>
        )}

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-green-600 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </motion.form>
    </div>
  );
}

export default Register;