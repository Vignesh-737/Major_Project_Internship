import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 localStorage.removeItem("token")



  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">

      <img
        src="/bg_image.png"
        alt="pharmacy"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute w-full h-full bg-black/20 "></div>

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-[360px]"
      >

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">
            PharmaStock
          </h1>
          <p className="text-sm text-gray-500">
            Inventory Management
          </p>
        </div>

        <h2 className="text-lg font-semibold text-center mb-4">
          Secure Login
        </h2>

        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <div className="flex items-center border rounded-lg px-2 mt-1">
            <FiMail className="text-gray-400" />
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-2 outline-none"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>
          <div className="flex items-center border rounded-lg px-2 mt-1">
            <FiLock className="text-gray-400" />
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 outline-none"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <span className="text-green-600 cursor-pointer">
            Forgot?
          </span>
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Login
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-3">
            {error}
          </p>
        )}

        <p className="text-center text-sm text-gray-500 mt-4">
          New user?{" "}
          <span className="text-green-600 cursor-pointer" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </motion.form>
    </div>
  );
}

export default Login;