// -----------------------------------------------------------------
// to seed the db with questions.

// const mongoose = require("mongoose");
// const Question = require("../models/questions");
// const mcqQuestions = require("./questions"); // Correct import
// require("dotenv").config(); // Load environment variables

// const seedDB = async () => {
//   try {
//     await mongoose.connect(
//       process.env.MONGO_URI,

//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );

//     console.log("Connected to MongoDB");

//     await Question.deleteMany({});
//     console.log("Previous questions deleted");

//     await Question.insertMany(mcqQuestions);
//     console.log("Database seeded with mcqQuestions");
//     console.log(mcqQuestions);

//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     mongoose.connection.close();
//   } finally {
//     await mongoose.disconnect();
//     console.log("🔌 Disconnected from MongoDB");
//   }
// };

// seedDB();

// -------------------------------------------------------------------------
// to test the question fetching for the user

// const Reminder = require("../models/reminder");
// const Question = require("../models/questions");

// // Fetch some questions
// const questions = await Question.find().limit(5);
// await Reminder.create({ user: someUserId, questions: questions.map(q => q._id), reminderTime: "10:00" });

// --------------------------------------------------------------------------
//to update the reminnder as per the model change

// const mongoose = require("mongoose");
// const Reminder = require("../models/reminder"); // Adjust path as needed
// require("dotenv").config();

// const MONGO_URI =
//   process.env.MONGO_URI

// const updateReminders = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(" Connected to MongoDB");

//     // Update all reminders to have an empty `questions` array
//     const result = await Reminder.updateMany({}, { $set: { questions: [] } });

//     console.log(` Updated ${result.modifiedCount} reminders`);
//   } catch (error) {
//     console.error("Error updating reminders:", error);
//   } finally {
//     mongoose.disconnect();
//     console.log(" Disconnected from MongoDB");
//   }
// };

// // Run the script
// updateReminders();

// ------------------------------------------------
// inserting seed data from the db for testing

// const mongoose = require("mongoose");
// const Reminder = require("../models/reminder");
// const Question = require("../models/questions");
// require("dotenv").config();

// const MONGO_URI = process.env.MONGO_URI ;
// const userId = "679b5d14095baba36c00725b"; // Replace with actual user ID

// const seedReminders = async () => {
//   try {
//      Connect to MongoDB
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 10000,
//     });

//     console.log("Connected to MongoDB");

//     //  Fetch some questions
//     const questions = await Question.find().limit(5);
//     if (questions.length === 0) throw new Error("❌ No questions found in DB");

//      // Update or create a reminder for this user
//     const updatedReminder = await Reminder.findOneAndUpdate(
//       { user: userId }, // Find reminder by user ID
//       {
//         $set: { questions: questions.map((q) => q._id), reminderTime: "10:00" },
//       }, // Update fields
//       { upsert: true, new: true } // Create if it doesn’t exist
//     );

//     console.log("🎯 Reminder updated successfully:", updatedReminder);
//   } catch (error) {
//     console.error("❌ Error seeding reminder:", error);
//   } finally {
//     //  Disconnect from MongoDB
//     mongoose.disconnect();
//     console.log("🔌 Disconnected from MongoDB");
//   }
// };

// Run the script
// seedReminders();
