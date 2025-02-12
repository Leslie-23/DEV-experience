const Reminder = require("../models/reminder.js");

// ✅ Set or Update Reminder for the Logged-in User
exports.setReminder = async (req, res) => {
  try {
    const { userId } = req.user; // Extract user from JWT middleware
    const { reminderTime } = req.body;

    // Validate time format (HH:mm)
    if (!/^\d{2}:\d{2}$/.test(reminderTime)) {
      return res
        .status(400)
        .json({ message: "Invalid time format. Use HH:mm" });
    }

    // Check if the user already has a reminder, then update or create
    const reminder = await Reminder.findOneAndUpdate(
      { user: userId },
      { reminderTime },
      { new: true, upsert: true } // If not found, create new
    );

    res
      .status(200)
      .json({ message: "Reminder time set successfully", reminder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// logic for setting language preference
const User = require("../models/User");

// Update user's preferred languages
exports.setPreferredLanguages = async (req, res) => {
  try {
    const { userId } = req.params; // Extract user ID from route
    const { languages } = req.body; // Expecting an array of languages

    if (!Array.isArray(languages)) {
      return res.status(400).json({ message: "Languages must be an array" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { preferredLanguages: languages },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({
        message: "Languages updated",
        preferredLanguages: user.preferredLanguages,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user's preferred languages
exports.getPreferredLanguages = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ preferredLanguages: user.preferredLanguages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
