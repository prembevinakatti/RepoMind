import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/repomind/auth/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert(res.data.message || "Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-white text-black">
      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full py-2 px-6 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-white/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
            <Github size={14} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-pink-600">REPO</span>MIND
          </h1>
        </div>
      </nav>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[90%] max-w-sm bg-white/60 backdrop-blur-xl border p-8 rounded-2xl shadow-xl mt-20"
      >
        <h2 className="text-3xl font-extrabold text-pink-600 text-center">
          Create Account
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-xl border bg-white"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-xl border bg-white"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-xl border bg-white"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-3 w-full py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 active:scale-95"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-center mt-5 text-sm">
          Already have an account?
          <a href="/login" className="text-pink-600 font-semibold">
            {" "}
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
