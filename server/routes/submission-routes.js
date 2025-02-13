const express = require("express");
const {
  submitAnswer,
  getUserSubmissions,
  getUserQuestions,
} = require("../controllers/submission-controller");

const router = express.Router();

router.post("/submit", submitAnswer); // Ensure submitAnswer is defined
router.get("/submissions/:userId", getUserSubmissions); // Ensure getUserSubmissions is defined
router.get("/user-questions", getUserQuestions);

module.exports = router;

// const express = require("express");
// const {
//   getQuestions,
//   syncQuestions,
// } = require("../controllers/question-controller");
// const { checkAnswer } = require("../services/aiServices");

// const router = express.Router();

// router.get("/get-questions", getQuestions);
// router.post("/sync", syncQuestions);
// router.post("/ai-check", checkAnswer);

// module.exports = router;
