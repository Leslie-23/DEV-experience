const UserStreak = require("../models/user-streak");

const updateUserStreak = async (userId) => {
  const today = new Date().setHours(0, 0, 0, 0); // Normalize date
  let streakData = await UserStreak.findOne({ user: userId });

  if (!streakData) {
    // If user has no streak record, create one
    streakData = await UserStreak.create({
      user: userId,
      streakCount: 1,
      lastSubmissionDate: today,
    });
  } else {
    const lastDate = new Date(streakData.lastSubmissionDate).setHours(
      0,
      0,
      0,
      0
    );
    const diffDays = (today - lastDate) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streakData.streakCount += 1; // Continue streak
    } else if (diffDays > 1) {
      streakData.streakCount = 1; // Reset streak
    }

    streakData.lastSubmissionDate = today;
    await streakData.save();
  }

  return streakData.streakCount;
};
