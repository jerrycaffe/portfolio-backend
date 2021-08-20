const express = require("express");
const { postResume } = require("../controllers/resume");

const router = express.Router();

router.post("/resume", postResume);

module.exports = router;
