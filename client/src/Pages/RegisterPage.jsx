import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-white text-black">

      {/* ---------------- SMALL NAVBAR ---------------- */}
      <nav className="absolute top-0 left-0 w-full py-2 px-6 flex justify-between items-center backdrop-blur-xl bg-white/40 border-b border-white/50">

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center shadow-lg">
            <Github size={14} className="text-white" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-pink-600">REPO</span>
            <span className="text-black">MIND</span>
          </h1>
        </div>

        <button
          onClick={() => window.history.back()}
          className="px-4 py-1.5 rounded-full border border-black bg-white hover:bg-pink-200 transition shadow-sm active:scale-95 text-xs"
        >
          ← Back
        </button>
      </nav>

      {/* ---------------- REGISTER CARD ---------------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="w-[90%] max-w-sm bg-white/60 backdrop-blur-xl border border-white/60 p-8 rounded-2xl shadow-xl mt-20"
      >
        <h2 className="text-3xl font-extrabold text-pink-600 text-center">Create Account</h2>
        <p className="text-center text-black mt-1">
          Register to continue with Repomind
        </p>

        {/* Inputs */}
        <div className="mt-6 flex flex-col gap-4">

          {/* Full Name */}
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-800 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-800 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-800 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Confirm Password */}
          {/* <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-800 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div> */}

          {/* Register Button */}
          <button
            onClick={() => alert("Registered Successfully!")}
            className="mt-3 w-full py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition active:scale-95 flex justify-center items-center gap-2"
          >
            Register
          </button>
        </div>

        {/* Login Redirect */}
        <p className="text-center mt-5 text-sm text-gray-800">
          Already have an account?{" "}
          <a href="/login" className="text-pink-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </motion.div>

      {/* ---------------- SMALL FOOTER ---------------- */}
      <footer className="py-2 text-center text-gray-700 border-t bg-white/40 backdrop-blur-xl w-full flex justify-center items-center gap-2 text-sm mt-10">
        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
          <Github size={13} className="text-white" />
        </div>
        <span>|</span>
        © {new Date().getFullYear()} Repomind
        <span>|</span>
      </footer>
    </div>
  );
};

export default RegisterPage;
