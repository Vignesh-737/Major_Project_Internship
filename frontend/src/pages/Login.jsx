import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock,FiEye, FiEyeOff } from "react-icons/fi";
import API from "../services/api";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!captchaValue) {
  toast.error("Please complete captcha");
  return;
}

    try {
          setLoading(true);
      const res = await API.post("/auth/login", { email, password });

     localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));
toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      toast.error(err.response?.data?.message||"Invalid credentials");
    }finally {

    setLoading(false);

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

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-end p-14 text-white">

        <div className="mb-10">

          <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">

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
            Monitor stock levels, manage medicines,
            track expiry dates and streamline
            pharmacy operations through one secure
            centralized platform.
          </p>

        </div>

      </div>

    </div>

    {/* RIGHT SECTION */}
    <div className="flex-1 flex items-center justify-center bg-white px-6">

      {/* FORM */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >

        {/* TOP */}
        <div className="mb-10">

          <h2 className="text-4xl font-bold text-gray-800">
            Sign In
          </h2>

          <p className="text-gray-500 mt-3 text-sm">
            Welcome back. Please login to continue.
          </p>

        </div>

        {/* EMAIL */}
        <div className="mb-5">

          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
            value={email}
            required
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-5">

          <div className="flex justify-between items-center">

            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <button
              type="button"
              onClick={() =>
                navigate("/forgot-password")
              }
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          <div className="relative mt-2">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
              value={password}
              required
              onChange={(e) =>
                setPassword(e.target.value)
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

        {/* REMEMBER */}
        <div className="flex items-center gap-2 mb-6">

          <input
            type="checkbox"
            className="accent-green-600"
          />

          <span className="text-sm text-gray-600">
            Remember me
          </span>

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
            ? "Signing in..."
            : "Sign In"}

        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-8">

          Don’t have an account?{" "}

          <button
            type="button"
            onClick={() =>
              navigate("/register")
            }
            className="text-green-600 font-semibold hover:underline"
          >
            Create Account
          </button>

        </p>

      </motion.form>

    </div>

  </div>
);}

export default Login;