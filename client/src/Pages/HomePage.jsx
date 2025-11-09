import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!repoUrl.trim()) {
      alert("Please enter a GitHub repository URL");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/repomind/repo/analyze",
        { repoUrl },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("✅ Repo analyzed:", response.data);

      if (response.data.success && response.data.repoId) {
        navigate(`/repo/${response.data.repoId}`);
      } else {
        alert("Invalid response — try again.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error analyzing repository.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-white text-black flex flex-col">
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
  );
};

export default HomePage;
