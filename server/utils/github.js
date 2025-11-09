const { Octokit } = require("octokit");
const axios = require("axios");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

exports.parseRepoUrl = (url) => {
  if (!url.includes("github.com")) throw new Error("Invalid GitHub URL");
  const [, right] = url.split("github.com/");
  const [owner, repoWithMaybeGit] = right.split("/");
  return { owner, repo: repoWithMaybeGit.replace(".git", "") };
};

// recursively fetch structure
exports.getRepoStructure = async function getRepoStructure(owner, repo, path = "") {
  const { data } = await octokit.rest.repos.getContent({ owner, repo, path });
  const items = Array.isArray(data) ? data : [data];
  const mapped = await Promise.all(
    items.map(async (item) => {
      if (item.type === "dir") {
        return {
          name: item.name,
          type: "folder",
          path: item.path,
          children: await getRepoStructure(owner, repo, item.path),
        };
      } else {
        return {
          name: item.name,
          type: "file",
          path: item.path,
          url: item.download_url || item.html_url,
        };
      }
    })
  );
  return mapped;
};

exports.flattenFiles = function flattenFiles(tree, acc = []) {
  for (const node of tree) {
    if (node.type === "file") acc.push(node);
    if (node.type === "folder") flattenFiles(node.children, acc);
  }
  return acc;
};

exports.fetchRaw = async (url) => {
  const { data } = await axios.get(url, { responseType: "text" });
  return data;
};
