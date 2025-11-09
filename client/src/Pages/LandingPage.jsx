import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import bgImage from "../assets/bg.jpg";

const LandingPage = () => {
  const [typedText, setTypedText] = useState("");
  const [showTree, setShowTree] = useState(false);
  const [autoDone, setAutoDone] = useState(false);
  const inputRef = useRef(null);

  const demoText = "https://github.com/vercel/next.js";

  // Auto typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(demoText.slice(0, i));
      i++;
      if (i > demoText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setAutoDone(true);
          setShowTree(true);
        }, 800);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = typedText;
  }, [typedText]);

  return (
    <div
      className="min-h-screen flex flex-col text-black"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* ---------------- SMALL NAVBAR ---------------- */}
      <nav className="w-full py-2 px-6 flex justify-between items-center backdrop-blur-xl bg-white/40 border-b border-white/30">

        {/* Logo + Text */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center shadow-lg">
            <Github size={14} className="text-white" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-pink-600">REPO</span>
            <span className="text-black">MIND</span>
          </h1>
        </motion.div>

        {/* Navbar Buttons */}
        <div className="flex gap-3 text-xs font-medium">

          <button 
            onClick={() => alert("Login Clicked")}
            className="px-4 py-1.5 rounded-full border border-black bg-white hover:bg-pink-200 transition shadow-sm active:scale-95"
          >
            Login
          </button>

          <button 
            onClick={() => alert("Register Clicked")}
            className="px-4 py-1.5 rounded-full border border-black bg-white hover:bg-pink-200 transition shadow-sm active:scale-95"
          >
            Register
          </button>

        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 text-center backdrop-blur-sm bg-white/30">

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Document Repos with
          <span className="text-pink-600"> One Click.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mt-4 text-gray-700 text-lg"
        >
          Repomind turns GitHub repositories into beautiful documentation instantly.
        </motion.p>

        {/* Input + Generate Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex gap-2 w-full max-w-lg"
        >
          <input
            ref={inputRef}
            type="text"
            readOnly
            placeholder="Paste your GitHub repo URL…"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white/90"
          />

          <button
            onClick={() => {
              setAutoDone(true);
              setShowTree(true);
            }}
            className={`px-5 py-3 rounded-xl flex items-center gap-2 transition active:scale-95
            ${autoDone ? "bg-pink-600 text-white" : "bg-black text-white"} 
            hover:bg-pink-500`}
          >
            Generate <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* ---------------- DIRECTORY TREE DEMO ---------------- */}
        <AnimatePresence>
          {showTree && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="mt-10 p-6 bg-white/90 rounded-xl shadow-xl text-left w-[370px]"
            >
              <pre className="text-sm font-mono text-gray-800">
{`📦 next.js/
 ┣ 📂 packages/
 ┃ ┣ 📂 next/
 ┃ ┃ ┣ 📜 router.js
 ┃ ┃ ┣ 📜 app.js
 ┣ 📂 examples/
 ┣ 📂 test/
 ┗ 📜 README.md`}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ---------------- SMALL FOOTER ---------------- */}
      <footer className="py-2 text-center text-gray-700 border-t bg-white/40 backdrop-blur-xl flex justify-center items-center gap-2 text-sm">

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

export default LandingPage;
