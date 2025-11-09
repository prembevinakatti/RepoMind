const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.summarizeFile = async (filePath, content) => {
  const prompt = `
You are a senior software doc generator. Summarize the file clearly:
- File: ${filePath}
- Include purpose, key functions/classes, how it's used, and any dependencies.
Keep it within 120-180 words.
Code (truncated if large):
${content.slice(0, 5000)}
  `;
  const r = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role:"user", content: prompt }]
  });
  return r.choices[0].message.content.trim();
};

exports.explainDependencies = async (deps) => {
  const prompt = `
Explain briefly (1 line each) what these npm packages do:
${deps.map(d=>`${d.name}@${d.version}`).join("\n")}
`;
  const r = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role:"user", content: prompt }]
  });
  return r.choices[0].message.content.trim();
};

exports.projectOverview = async ({ fileSummaries, depsSample }) => {
  const prompt = `
You are a repo analyst. Provide:
1) A concise overview (what the project does, tech stack),
2) Key folders and their roles,
3) 3 improvement suggestions.

Context:
File summaries:
${fileSummaries.slice(0,8).map(f=>`- ${f.file}: ${f.summary.slice(0,160)}`).join("\n")}

Dependencies:
${depsSample.slice(0,10).map(d=>`${d.name}@${d.version}`).join(", ")}
`;
  const r = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role:"user", content: prompt }]
  });
  return r.choices[0].message.content.trim();
};
