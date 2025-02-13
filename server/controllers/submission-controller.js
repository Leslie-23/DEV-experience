const Submission = require("../models/submissions");
const Question = require("../models/questions");
const { checkAnswer } = require("../services/aiServices");
const Reminder = require("../models/reminder");
const { updateUserStreak } = require("./user-streak-controller");

const submitAnswer = async (req, res) => {
  try {
    const { userId, answers } = req.body;
    if (!userId || !answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ error: "Missing data" });
    }
    const streakCount = await updateUserStreak(userId);
    // Fetch questions based on the provided question IDs
    const questionIds = Object.keys(answers);
    const questions = await Question.find({ _id: { $in: questionIds } });

    let score = 0;
    let feedbackList = [];

    questions.forEach((q) => {
      const userAnswer = answers[q._id];
      const isCorrect = userAnswer === q.correctAnswer;

      feedbackList.push({
        questionId: q._id,
        question: q.question,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
      });

      if (isCorrect) score++;
    });

    res.json({ score, total: questions.length, feedback: feedbackList });
  } catch (error) {
    console.error("❌ Error processing submission:", error);
    res.status(500).json({ error: "Server error" });
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

const getUserQuestions = async (req, res) => {
  try {
    const userId = req.query.user;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    //  Ensure `questions` is correctly populated
    const reminder = await Reminder.findOne({ user: userId }).populate({
      path: "questions",
      model: "Question", // Ensure it references the correct model
    });

    if (!reminder || !reminder.questions || reminder.questions.length === 0) {
      return res.json([]); // Return an empty array if no questions exist
    }

    res.json(reminder.questions);
  } catch (error) {
    console.error(" Error fetching questions:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { submitAnswer, getUserSubmissions, getUserQuestions };

// try {
//   const userId = req.query.user;
//   if (!userId) return res.status(400).json({ error: "User ID is required" });

//   // Find the reminder for this user and get their questions
//   const reminder = await Reminder.findOne({ user: userId }).populate(
//     "questions"
//   );
//   if (!reminder)
//     return res.status(404).json({ error: "No questions found for user" });

//   res.json(reminder.questions);
// } catch (error) {
//   console.error("Error fetching questions:", error);
//   res.status(500).json({ error: "Server error" });
// } // this is the initial try run for the `getUserQuestion`
