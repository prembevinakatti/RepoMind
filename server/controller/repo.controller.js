const Repo = require("../models/repo.model");
const {
  parseRepoUrl,
  getRepoStructure,
  flattenFiles,
  fetchRaw,
} = require("../utils/github");
const {
  summarizeFile,
  explainDependencies,
  projectOverview,
} = require("../services/ai.service");
const axios = require("axios");

const IMPORTANT_EXT = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".py",
  ".java",
  ".go",
  ".rb",
  ".rs",
  ".cs",
  ".php",
  ".c",
  ".cpp",
  ".md",
];

const isImportant = (name) =>
  IMPORTANT_EXT.some((ext) => name.toLowerCase().endsWith(ext));

exports.analyzeRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ message: "repoUrl required" });

    const { owner, repo } = parseRepoUrl(repoUrl);

    // 1) structure
    const structure = await getRepoStructure(owner, repo);

    // 2) flatten & filter
    const files = flattenFiles(structure)
      .filter((f) => isImportant(f.name))
      .slice(0, 25);

    // 3) fetch and summarize (batch)
    const summaries = [];
    for (const f of files) {
      try {
        const content = await fetchRaw(f.url);
        const summary = await summarizeFile(f.path, content);
        summaries.push({ file: f.path, summary });
      } catch {
        summaries.push({ file: f.path, summary: "Could not fetch/summarize." });
      }
    }

    // 4) dependencies (package.json if exists)
    let dependencies = [];
    const pkg = files.find((f) => f.path.endsWith("package.json"));
    if (pkg) {
      try {
        const raw = await fetchRaw(pkg.url);
        const pkgJson = JSON.parse(raw);
        const deps = Object.entries(pkgJson.dependencies || {}).map(
          ([name, version]) => ({ name, version })
        );
        const devDeps = Object.entries(pkgJson.devDependencies || {}).map(
          ([name, version]) => ({ name, version })
        );
        dependencies = [...deps, ...devDeps];
        if (dependencies.length) {
          const note = await explainDependencies(dependencies.slice(0, 25));
          // attach a single note blob, or parse by lines if you want per-package notes
          dependencies = dependencies.map((d) => ({ ...d }));
          dependencies.__note = note;
        }
      } catch {}
    }

    // 5) insights
   const insights = await projectOverview(summaries, dependencies);


    // 6) save
    const doc = await Repo.create({
      owner,
      repo,
      repoUrl,
      structure,
      documentation: summaries,
      dependencies,
      insights,
      analyzedAt: new Date(),
      userId: req.userId,
    });

    return res.json({
      success: true,
      repoId: doc._id,
      owner,
      repo,
      structure,
      documentation: summaries,
      dependencies,
      insights,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: "Analysis failed" });
  }
};

exports.getRepoById = async (req, res) => {
  const { id } = req.params;
  const doc = await Repo.findById(id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  return res.json({ success: true, data: doc });
};
