const mongoose = require("mongoose");
const Question = require("../models/questions");
const mcqQuestions = require("./questions"); // Correct import
require("dotenv").config(); // Load environment variables

const seedDB = async () => {
  try {
    await mongoose.connect(
      // process.env.MONGO_URI ||
      "mongodb+srv://leslieajayi27:KsHojAFxSDyxBaWA@dev-exp.cxn5v.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Connected to MongoDB");

    await Question.deleteMany({});
    console.log("Previous questions deleted");

    await Question.insertMany(mcqQuestions);
    console.log("Database seeded with mcqQuestions");
    console.log(mcqQuestions);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

seedDB();
