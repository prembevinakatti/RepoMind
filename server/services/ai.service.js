const axios = require("axios");
require("dotenv").config();

const MODEL = "mistralai/mistral-7b-instruct";

const api = axios.create({
  baseURL: "https://openrouter.ai/api/v1/chat/completions",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// 🔹 Summarize a single file
exports.summarizeFile = async (filePath, codeContent) => {
  const prompt = `
You are a senior developer writing concise documentation for a GitHub repository.
Summarize the file "${filePath}" in about 150 words, describing its purpose, main functions/classes, and how it connects to other parts of a project.
Code snippet:
${codeContent.slice(0, 5000)}
`;

  const res = await api.post("", {
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
  });

  return res.data.choices[0].message.content.trim();
};

// 🔹 Explain dependencies
exports.explainDependencies = async (deps) => {
  const prompt = `
Explain briefly (in one line each) what these npm packages are used for:
${deps.map((d) => `${d.name}@${d.version}`).join("\n")}
`;

  const res = await api.post("", {
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
  });

  return res.data.choices[0].message.content.trim();
};

// 🔹 Generate project overview
exports.projectOverview = async (fileSummaries = [], deps = []) => {
  const prompt = `
You are analyzing a GitHub project. 
Provide:
1. A 2-paragraph overview of what this project does
2. The main technologies used
3. 3 improvement suggestions

Context:
Files:
${fileSummaries
  .slice(0, 8)
  .map((s) => `- ${s.file}: ${s.summary.slice(0, 150)}`)
  .join("\n")}

Dependencies:
${deps.slice(0, 10).map((d) => d.name).join(", ")}
`;

  const res = await api.post("", {
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
  });

  return res.data.choices[0].message.content.trim();
};
