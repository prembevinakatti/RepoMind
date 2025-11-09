import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Github } from "lucide-react";
import axios from "axios";
import DirectoryTree from "../components/DirectoryTree";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RepoDetailsPage = () => {
  const { id } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/repomind/repo/${id}`,
          { withCredentials: true }
        );
        console.log("✅ Repo details fetched:", res.data);
        setRepoData(res.data.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to fetch repo details!");
      }
      setLoading(false);
    };
    fetchRepoDetails();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading repo details...
      </div>
    );

  if (!repoData)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Repository not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-white text-black">
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

      {/* Content */}
      <div className="p-6">
        <h2 className="text-4xl font-bold text-pink-600">
          {repoData.owner}/{repoData.repo}
        </h2>
        <a
          href={repoData.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 mt-1 hover:underline"
        >
          {repoData.repoUrl}
        </a>

        {/* Directory */}
        <h3 className="text-2xl mt-6 font-bold">📁 Directory Structure</h3>
        <div className="mt-3 bg-white/70 p-4 rounded-xl shadow">
          <DirectoryTree structure={repoData.structure} />
        </div>

        {/* Documentation */}
        <h3 className="text-2xl mt-6 font-bold">📄 Documentation</h3>
        <div className="mt-3 bg-white/70 p-4 rounded-xl shadow space-y-3">
          {repoData.documentation.map((doc, i) => (
            <div key={i}>
              <h4 className="font-bold text-gray-800">{doc.file}</h4>
              <p className="text-sm text-gray-700">
                {doc.summary || "No summary available."}
              </p>
            </div>
          ))}
        </div>

        {/* Insights */}
        <h3 className="text-2xl mt-6 font-bold">💡 Insights</h3>
        <div className="mt-3 bg-white/90 p-6 rounded-xl shadow text-gray-800 prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {repoData.insights
              ?.replace(/^<s>\s*\[OUT\]\s*/gi, "")
              .replace(/\[\/OUT\]\s*<\/s>/gi, "")
              .trim() || "_No insights available._"}
          </ReactMarkdown>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-2 text-center text-gray-700 border-t bg-white/40 backdrop-blur-xl text-sm">
        © {new Date().getFullYear()} Repomind • Auto-Docs for Developers
      </footer>
    </div>
  );
};

export default RepoDetailsPage;
