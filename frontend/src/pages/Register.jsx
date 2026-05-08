import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiHash,FiEye, FiEyeOff } from "react-icons/fi";

import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: ""
  });

  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if(!captchaValue){
      toast.error("Please complete captcha");
      return
    }

    try {
      setLoading(true);
      await API.post("/auth/register", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }finally{
      setLoading(false)
    }
  };

 return (
  <div className="h-screen flex overflow-hidden bg-gray-100">

    {/* LEFT IMAGE SECTION */}
    <div className="hidden lg:block lg:w-1/2 relative">

      <img
        src="/bg_image.png"
        alt="pharmacy"
        className="w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-end p-14 text-white">

        <div className="mb-10">

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">

            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />

          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Pharmacy Inventory
            <br />
            Management System
          </h1>

          <p className="mt-5 text-gray-200 max-w-md text-sm leading-7">
            Register employees, manage stock,
            monitor medicine expiry and control
            pharmacy operations through one
            centralized system.
          </p>

        </div>

      </div>

    </div>

    {/* RIGHT SECTION */}
    <div className="flex-1 flex items-center justify-center bg-white px-6">

      {/* FORM */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >

        {/* TOP */}
        <div className="mb-8">

          <h2 className="text-4xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mt-3 text-sm">
            Register a new employee account
          </p>

        </div>

        {/* NAME */}
        <div className="mb-4">

          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter full name"
            className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
            value={form.name}
            required
            onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
          />

        </div>

        {/* EMAIL */}
        <div className="mb-4">

          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
            value={form.email}
            required
            onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
          />

        </div>

        {/* EMPLOYEE ID */}
        <div className="mb-4">

          <label className="text-sm font-medium text-gray-700">
            Employee ID
          </label>

          <input
            type="text"
            placeholder="Enter employee ID"
            className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
            value={form.employeeId}
            required
            onChange={(e) =>
                setForm({ ...form, employeeId: e.target.value })
              }
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-5">

          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative mt-2">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
              value={form.password}
              required
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              {showPassword
                ? <FiEyeOff size={20} />
                : <FiEye size={20} />
              }
            </button>

          </div>

        </div>

        {/* CAPTCHA */}
        <div className="mb-6 flex justify-center scale-[0.95] origin-center">

          <ReCAPTCHA
            sitekey={
              import.meta.env
                .VITE_RECAPTCHA_SITE_KEY
            }
            onChange={(value) =>
              setCaptchaValue(value)
            }
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 rounded-2xl font-semibold text-white transition-all duration-300 ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
          }`}
        >

          {loading
            ? "Creating Account..."
            : "Create Account"}

        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-8">

          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </button>

        </p>

      </motion.form>

    </div>

  </div>
);
}

export default Register;