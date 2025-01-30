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
