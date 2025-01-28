const cron = require("node-cron");
const User = require("../models/User");
const Utility = require("../utils/utility");

// Schedule job to run every minute (can be configured to hourly or daily)
cron.schedule("* * * * *", async () => {
  console.log("Running problem set scheduler...");

  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  try {
    // Find users whose reminderTime matches the current time
    const users = await User.find({
      reminderTime: `${currentHour.toString().padStart(2, "0")}:${currentMinute
        .toString()
        .padStart(2, "0")}`,
    });

    for (const user of users) {
      const problems = Utility.generateProblemSet();
      user.problemSetHistory.push({ date: new Date(), problems });
      await user.save();

      // Optionally send email or push notification here
      console.log(`Sent problem set to ${user.email}`);
    }
  } catch (error) {
    console.error("Error running scheduler:", error.message);
  }
});
