const express = require("express");
const {
  getSnippets,
  createSnippet,
  //   updateSnippet,
  //   deleteSnippet,
  addComment,
  deleteComment,
  hideComment,
} = require("../controllers/snippet-controller");

const router = express.Router();

router.get("/", getSnippets);
router.post("/", createSnippet);
// router.put("/:id", updateSnippet);
// router.delete("/:id", deleteSnippet);

router.post("/:id/comments", addComment);
router.delete("/:snippetId/comments/:commentId", deleteComment);
router.put("/:snippetId/comments/:commentId/hide", hideComment);

module.exports = router;
