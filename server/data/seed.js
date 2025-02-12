const mongoose = require("mongoose");
const Question = require("../models/questions");
const questions = require("./questions"); // Import questions
require("dotenv").config(); // Load environment variables

const seedDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://leslieajayi27:KsHojAFxSDyxBaWA@dev-exp.cxn5v.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Connected to MongoDB");

    await Question.deleteMany({});
    console.log("Previous questions deleted");

    await Question.insertMany(questions);
    console.log("Database seeded with questions");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDB();
