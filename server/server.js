require("dotenv").config(); // Load environment variables
require("./scheduler/problemSetScheduler"); // Start the cron job when server runs
const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/user-routes");
const userAdminRoutes = require("./routes/user-routes");
const userReminderRoutes = require("./routes/reminder-routes");
const submissionRoutes = require("./routes/submission-routes");

const cors = require("cors");

const app = express();
app.use(express.json());

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.options("*", cors()); // Enable CORS for all routes. CORS is a real security risk and a B*tch to set up

connectDB();

app.use(express.json()); // To parse JSON bodies
// user related routes
app.use("/api/user", userRoutes);
app.use("/api/users", userAdminRoutes);
app.use("/api/user", userReminderRoutes);

// Submission routes
app.use("/api/submission", submissionRoutes);

// Home Route
app.get("/", (req, res) => {
  const data = {
    message: "API is live",
    status: 200,
    data: "Welcome to the API!",
    timestamp: new Date(),
  };
  res.json(data);
  // res.send("API is running... yippy");
  // res.sendFile(path.join(__dirname, "client", "frontend", "index.html")); // to better handle API landing page
});
app.get("/test", (req, res) => {
  res.send("--test \n API is live.");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
