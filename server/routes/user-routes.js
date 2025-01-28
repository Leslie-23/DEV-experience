const express = require("express");
const {
  userLogin,
  userLogout,
} = require("../controllers/user-login-controller");
const {
  userSignup,
  adminSignup,
  deleteUser,
  updateUser,
  viewAllUsers,
  viewUser,
} = require("../controllers/user-controller");
const {
  setReminderTime,
  submitCodeSubmission,
  sendDailyProblemSet,
} = require("../controllers/user-controller");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", userLogin);
router.post("/logout", userLogout);

// User and Admin Routes
router.post("/signup", userSignup); // User signup
router.post("/admin/signup", adminSignup); // Admin signup

router.delete("/delete/:userId", deleteUser); // Delete user
router.put("/update/:userId", updateUser); // Update user
router.get("/viewAll", viewAllUsers); // View all users
router.get("/view/:userId", viewUser); // View specific user

// Routes for reminders
router.post("/set-reminder", authMiddleware, setReminderTime);
router.post("/submit-answer", submitCodeSubmission);

// For periodic problem set sending, this can be triggered by a scheduled job.
router.post("/send-daily-problems", sendDailyProblemSet);

module.exports = router;
