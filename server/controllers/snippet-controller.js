const mongoose = require("mongoose");
const Snippet = require("../models/snippet");

// Get all snippets (with user details)
exports.getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find()
      .populate({ path: "user", select: "user _id" }) //
      .populate({ path: "comments.user", select: "username _id" }); //

    res.json(snippets);
    // console.log("Fetched Snippets:", snippets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new snippet
exports.createSnippet = async (req, res) => {
  try {
    const { user, code, language } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }

    const snippet = new Snippet({
      user: new mongoose.Types.ObjectId(user), // Convert to ObjectId
      code,
      language,
    });

    await snippet.save();
    res.status(201).json(snippet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add a comment to a snippet
exports.addComment = async (req, res) => {
  try {
    const { user, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }

    const snippet = await Snippet.findById(req.params.id)
      .populate("user", "username") // Populate the snippet owner's username
      .populate("comments.user", "username"); // Populate comment authors;
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found." });
    }

    snippet.comments.push({
      user: new mongoose.Types.ObjectId(user),
      text,
    });

    await snippet.save();
    res.json(snippet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a comment (Only by the comment creator)
exports.deleteComment = async (req, res) => {
  try {
    const { user } = req.body;
    const { snippetId, commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found." });
    }

    const commentIndex = snippet.comments.findIndex(
      (comment) =>
        comment._id.toString() === commentId && comment.user.toString() === user
    );

    if (commentIndex === -1) {
      return res
        .status(403)
        .json({ error: "Unauthorized or comment not found." });
    }

    snippet.comments.splice(commentIndex, 1);
    await snippet.save();
    res.json(snippet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Hide a comment (For personal view only)
exports.hideComment = async (req, res) => {
  try {
    const { user } = req.body;
    const { snippetId, commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found." });
    }

    const comment = snippet.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (!comment.hiddenBy.includes(user)) {
      comment.hiddenBy.push(user);
    }

    await snippet.save();
    res.json(snippet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
