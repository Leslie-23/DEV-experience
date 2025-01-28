const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// Environment Variable for Admin Signup Authorization
const ADMIN_SIGNUP_KEY = process.env.ADMIN_SIGNUP_KEY || "secure_admin_key";

// User Signup
exports.userSignup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// Admin Signup
exports.adminSignup = async (req, res) => {
  const { name, email, password, signupKey, phone } = req.body;

  try {
    if (signupKey !== ADMIN_SIGNUP_KEY) {
      return res
        .status(403)
        .json({ message: "Invalid signup key for admin creation" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View All Users
exports.viewAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View Specific User
exports.viewUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
// const User = require("../models/User");
const Utility = require("../utils/utility");

// Set the reminder time for the logged-in user
exports.setReminderTime = async (req, res) => {
  try {
    // Ensure req.user exists
    if (!req.user || !req.user.email) {
      return res.status(400).json({ message: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }

  try {
    const { email } = req.user; // Assume email is from authentication middleware
    const { reminderTime } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { reminderTime },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res
      .status(200)
      .json({ message: "Reminder time updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};

// Send daily problem set based on user reminder time
exports.sendDailyProblemSet = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate new problems
    const problems = Utility.generateProblemSet();
    user.problemSetHistory.push({ date: new Date(), problems });
    await user.save();

    // Optionally, send email or push notification here
    res
      .status(200)
      .json({ message: "Daily problem set sent successfully", problems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle code submission from the user
exports.submitCodeSubmission = async (req, res) => {
  try {
    const { email } = req.user; // Assume email is from authentication middleware
    const { problemId, submittedAnswer } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const submission = {
      problemId,
      submittedAnswer,
      submissionDate: new Date(),
      status: "pending", // Status can be updated later by an AI or manual review
    };

    user.submissions.push(submission);
    await user.save();

    res.status(200).json({ message: "Code submission received", submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// module.exports = {
//   setReminderTime,
//   sendDailyProblemSet,
//   submitCodeSubmission,
// };
