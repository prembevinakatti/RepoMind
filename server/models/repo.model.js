const mongoose = require("mongoose");

const repoSchema = new mongoose.Schema(
  {
    owner: String,
    repo: String,
    repoUrl: String,
    structure: Array,
    documentation: Array,
    dependencies: Array,
    insights: Object,
    analyzedAt: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repo", repoSchema);
