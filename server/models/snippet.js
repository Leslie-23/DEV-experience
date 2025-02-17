const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // References User model
  text: { type: String, required: true },
  hiddenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who hid this comment
  createdAt: { type: Date, default: Date.now },
});

const SnippetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true },
  language: { type: String, required: true, default: "javascript" },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Snippet", SnippetSchema);

// language: { type: String, required: true, default: "javascript" },
// comments: [CommentSchema],
