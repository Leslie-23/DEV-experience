const mongoose = require("mongoose");

const UserStreakSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  streakCount: { type: Number, default: 0 }, // Tracks user's current streak
  lastSubmissionDate: { type: Date, default: null }, // Last day user submitted answers
});

module.exports = mongoose.model("UserStreak", UserStreakSchema);
