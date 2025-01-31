const express = require("express");
const {
  getQuestions,
  syncQuestions,
} = require("../controllers/question-controller");
const { checkAnswer } = require("../services/aiServices");

const router = express.Router();

router.get("/get-questions", getQuestions);
router.post("/sync", syncQuestions);
router.post("/ai-check", checkAnswer);

module.exports = router;
