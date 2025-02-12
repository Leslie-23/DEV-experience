// checking if the file exists
const fs = require("fs");
console.log(
  "Checking Reminder model existence: ./models/Reminder.js",
  fs.existsSync("./models/Reminder.js")
);
console.log(
  "Checking Reminder model existence: ../models/Reminder.js",
  fs.existsSync("../models/Reminder.js")
);

const cron = require("node-cron");
const Reminder = require("../models/reminder.js");
// console.log(`${Reminder}`);
// const User = require("../models/User");
const { sendEmail } = require("../utils/emailService");
const Utility = require("../utils/Utility.js");

// Scheduler runs every minute to check for users who need a problem set
cron.schedule("* * * * *", async () => {
  console.log("⏳ Checking for users to send problem sets...");

  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  try {
    // Find reminders that match the current time and populate user data
    const reminders = await Reminder.find({
      reminderTime: currentTime,
    }).populate("user");

    for (const reminder of reminders) {
      if (!reminder.user || !reminder.user.email) {
        console.warn("⚠️ Skipping reminder: User email missing");
        continue;
      }

      // Generate problem set
      const problems = await Utility.generateProblemSet();
      console.log("🔍 Debugging problems:", problems, Array.isArray(problems));
      const emailText = `Here’s your daily problem set:\n\n${problems
        .map((p) => `- ${p.question} (${p.options})`)
        .join("\n")}`;

      // Send email to the correct logged-in user
      await sendEmail(
        reminder.user.email,
        "Your Daily Coding Problem Set",
        emailText
      );
    }
  } catch (error) {
    console.error("❌ Error running scheduler:", error.message);
  }
});

// const cron = require("node-cron");
// const User = require("../models/User");
// const Utility = require("../utils/Utility");

// //  Runs every minute and checks if a user should receive problems
// cron.schedule("* * * * *", async () => {
//   const now = new Date();
//   const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
//     .getMinutes()
//     .toString()
//     .padStart(2, "0")}`;

//   try {
//     const users = await User.find({ reminderTime: currentTime });

//     for (const user of users) {
//       const problems = Utility.generateProblemSet();
//       user.problemSetHistory.push({ date: new Date(), problems });
//       await user.save();
//       console.log(`✅ Problem set sent to ${user.email}`);
//     }
//   } catch (error) {
//     console.error("❌ Scheduler Error:", error.message);
//   }
// });
