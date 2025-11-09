const router = require("express").Router();
const { analyzeRepo, getRepoById } = require("../controller/repo.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/analyze", isAuthenticated, analyzeRepo);
router.get("/:id", isAuthenticated, getRepoById);

module.exports = router;
