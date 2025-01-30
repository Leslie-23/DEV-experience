const cron = require("node-cron");
const User = require("../models/User");
const Utility = require("../utilities/Utility");

// ✅ Runs every minute and checks if a user should receive problems
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  try {
    const users = await User.find({ reminderTime: currentTime });

    for (const user of users) {
      const problems = Utility.generateProblemSet();
      user.problemSetHistory.push({ date: new Date(), problems });
      await user.save();
      console.log(`✅ Problem set sent to ${user.email}`);
    }
  } catch (error) {
    console.error("❌ Scheduler Error:", error.message);
  }
});
