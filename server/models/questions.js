const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String], // Store multiple choices
  correctAnswer: String, // Store the correct option
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  statement: String, // Problem statement
});

module.exports = mongoose.model("Question", QuestionSchema);
