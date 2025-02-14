const path = require("path");
const cron = require("node-cron");
// const Reminder = require("../models/reminder.js");
const Reminder = require(path.join(__dirname, "../models/reminder.js"));
// console.log(`${Reminder}`);
// const User = require("../models/User");
const { sendEmail } = require("../utils/emailService");
const Utility = require("../utils/Utility");

// checking if the file exists
// const fs = require("fs");
// console.log(
//   "Checking Reminder model existence: ./models/reminder.js",
//   fs.existsSync("./models/reminder.js")
// );
// console.log(
//   "Checking Reminder model existence: ../models/reminder.js",
//   fs.existsSync(path.join(__dirname, "../models/reminder.js"))
// );

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
      const problemsSync = reminder.questions;
      // console.log("📩 Sending the same questions:", problems);

      // console.log("Debugging problems:", problems, Array.isArray(problems));
      // console.log("Debugging problems:", JSON.stringify(problems, null, 2));  // fir testing purposes.
      const emailText = `📌 Your Daily Coding Problem Set 📌\n\n${problems
        .map(
          (p, index) =>
            `👉 Q${index + 1}: ${p.question}\nOptions: ${p.options.join(
              ", "
            )}\n`
        )
        .join("\n")}
      Happy coding! 🚀`;

      // emailHTML optional to send formatted docs but gmail doesnt seem to load this
      const emailHTML = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #007BFF;">📌 Your Daily Coding Problem Set 📌</h2>
        <ul>
          ${problems
            .map(
              (p, index) => `
              <li>
                <strong>Q${index + 1}: ${p.question}</strong><br>
                <em>Options:</em> ${p.options.join(", ")}
              </li>`
            )
            .join("")}
        </ul>
        <p style="color: #007BFF; font-weight: bold;">Happy coding! 🚀</p>
      </div>
    `;

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
