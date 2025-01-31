const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  codeforcesId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  tags: [String], // Filtering purposes
  difficulty: String, // Easy, Medium, Hard
  statement: String, // Problem statement
});

module.exports = mongoose.model("Question", QuestionSchema);
