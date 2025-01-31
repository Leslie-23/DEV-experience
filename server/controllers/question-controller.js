const Question = require("../models/questions");
const { fetchCodeforcesProblems } = require("../services/codeforcesService");

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions" });
  }
};

const syncQuestions = async (req, res) => {
  try {
    const problems = await fetchCodeforcesProblems();

    for (const problem of problems) {
      await Question.updateOne(
        { codeforcesId: problem.contestId },
        {
          name: problem.name,
          tags: problem.tags,
          difficulty: problem.index,
          statement: `Find this problem on Codeforces: https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`,
        },
        { upsert: true }
      );
    }

    res.json({ message: "Synced Codeforces questions." });
  } catch (error) {
    res.status(500).json({ error: "Error syncing questions" });
  }
};

module.exports = { getQuestions, syncQuestions };
