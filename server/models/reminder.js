const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  }, // One reminder per user
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  reminderTime: { type: String, required: true }, // Format: HH:mm
});

// module.exports = mongoose.model("Reminder", ReminderSchema);
// module.exports = mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);

module.exports = mongoose.model("Reminder", ReminderSchema);
