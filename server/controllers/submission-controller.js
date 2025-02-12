const Submission = require("../models/submissions");
const Question = require("../models/questions");
const { checkAnswer } = require("../services/aiServices");

const submitAnswer = async (req, res) => {
  const { userId, questionId, userAnswer } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const { feedback, rating } = await checkAnswer(question, userAnswer);

    const submission = await Submission.create({
      user: userId,
      question: questionId,
      userAnswer,
      aiFeedback: feedback,
      rating,
    });

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: "Submission failed" });
  }
};

const getUserSubmissions = async (req, res) => {
  const { userId } = req.params;

  try {
    const submissions = await Submission.find({ user: userId }).populate(
      "question"
    );
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching submissions" });
  }
};

module.exports = { submitAnswer, getUserSubmissions };
