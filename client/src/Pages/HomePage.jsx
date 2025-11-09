import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import axios from "axios";

import gitty from "../assets/gitty.jpg";  // ✅ IMPORT BACKGROUND IMAGE

const HomePage = () => {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");

  const loadingTexts = [
    "🔍 Fetching repository...",
    "📁 Reading files & folders...",
    "🧠 Analyzing source code...",
    "📄 Generating documentation...",
    "✨ Finalizing results...",
  ];

  // Cycle loading text every 1s
  useEffect(() => {
    if (!loading) return;
    let i = 0;

    const interval = setInterval(() => {
      setLoadingStep(loadingTexts[i]);
      i = (i + 1) % loadingTexts.length;
    }, 900);

    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async () => {
    if (!repoUrl.trim()) {
      alert("Please enter a GitHub repository URL");
      return;
    }

    setLoading(true);
    setLoadingStep("🔍 Fetching repository...");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/repomind/repo/analyze",
        { repoUrl },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success && response.data.repoId) {
        navigate(`/repo/${response.data.repoId}`);
      } else {
        alert("Invalid response — try again.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error analyzing repository.");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen text-black flex flex-col"
      style={{
        backgroundImage: `url(${gitty})`,   // ✅ APPLY BACKGROUND
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/70 via-pink-200/70 to-white/70"></div>

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Navbar */}
        <nav className="w-full py-3 px-6 flex justify-between items-center backdrop-blur-xl bg-white/40 border-b border-white/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shadow-md">
              <Github size={16} className="text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-wide">
              <span className="text-pink-600">REPO</span>MIND
            </h1>
          </div>
        </nav>

        {/* Main */}
        <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold"
          >
            Analyze GitHub Repos
            <span className="text-pink-600"> Instantly.</span>
          </motion.h1>

          <p className="max-w-xl mt-4 text-gray-700 text-lg">
            Enter any public GitHub repository URL to generate structured documentation.
          </p>

          <div className="mt-8 flex gap-2 w-full max-w-lg">
            <input
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              type="text"
              placeholder="Paste your GitHub repo URL…"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm"
            />

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 transition active:scale-95 ${
                loading ? "bg-gray-400" : "bg-black hover:bg-pink-600"
              } text-white`}
            >
              {loading ? "Analyzing..." : "Generate"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-2 text-center text-gray-700 border-t bg-white/40 backdrop-blur-xl text-sm">
          © {new Date().getFullYear()} Repomind • Auto-Docs for Developers
        </footer>

      </div>

      {/* ===================== LOADING OVERLAY ===================== */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[320px] text-center"
            >
              <motion.div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-pink-600"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "linear",
                  }}
                />
              </motion.div>

              <p className="text-lg font-semibold text-pink-700">
                {loadingStep}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
                className="text-sm text-gray-600 mt-2"
              >
                Please wait...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default HomePage;
