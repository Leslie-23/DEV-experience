require("dotenv").config(); // Load environment variables
require("./scheduler/problemSetScheduler"); // Start the cron job when server runs
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Import Routes
const userRoutes = require("./routes/user-routes");
const adminRoutes = require("./routes/admin-routes"); // FIX: Corrected admin route
const reminderRoutes = require("./routes/reminder-routes");
const submissionRoutes = require("./routes/submission-routes");
const streakRoutes = require("./routes/user-streak-routes");

// Clerk authentication middleware
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
const clerkAuthMiddleware = ClerkExpressWithAuth({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(clerkAuthMiddleware); // FIX: Use only once

// Enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dev-experience-sj2j-kbjftg70q-leslie-23s-projects.vercel.app",
    ], // FIX: Remove trailing `/`
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🛠 FIX: Logging Middleware (should be above routes)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Fix /favicon.ico request error
app.get("/favicon.ico", (req, res) => res.status(204).end());

// 🛠 FIX: Correct route definitions (avoid overwriting routes)
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/streaks", streakRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "API is live", status: 200 });
});

// Health Check
app.get("/test", (req, res) => {
  res.send("--test \n API is live.");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

// require("dotenv").config(); // Load environment variables
// require("./scheduler/problemSetScheduler"); // Start the cron job when server runs
// const express = require("express");
// const connectDB = require("./config/db");
// const cors = require("cors");

// const userRoutes = require("./routes/user-routes");
// const userAdminRoutes = require("./routes/user-routes");
// const userReminderRoutes = require("./routes/reminder-routes");
// const submissionRoutes = require("./routes/submission-routes");
// const userStreakRoutes = require("./routes/user-streak-routes");

// // clerk stuff. for passing the tokens
// const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
// const clerkAuthMiddleware = ClerkExpressWithAuth({
//   publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
//   secretKey: process.env.CLERK_SECRET_KEY,
// });

// const app = express();
// app.use(express.json()); // To parse JSON bodies
// app.use(ClerkExpressWithAuth());
// app.options("*", cors()); // Enable CORS for all routes. CORS is a real security risk and a B*tch to set up

// connectDB();

// // Use CORS middleware
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://dev-experience-sj2j-kbjftg70q-leslie-23s-projects.vercel.app/",
//     ], // Allow these origins (dev and prod)
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
//     credentials: true, // Allow cookies and authorization headers
//   })
// );

// // favico issues in vercel
// app.get("/favicon.ico", (req, res) => res.status(204).end());

// // user related routes
// app.use("/api/user", userRoutes);
// app.use("/api/users", userAdminRoutes);
// app.use("/api/user", userReminderRoutes);

// // Submission routes
// app.use("/api/submission", submissionRoutes);
// app.use("/api/submission", userStreakRoutes);

// // Home Route
// app.get("/", (req, res) => {
//   const data = {
//     message: "API is live",
//     status: 200,
//     // data: "Welcome to the API!",
//     // timestamp: new Date(),
//   };
//   res.json(data);

//   // res.send("API is running... yippy");
//   // res.sendFile(path.join(__dirname, "client", "frontend", "index.html")); // to better handle API landing page
// });

// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// });
// app.get("/test", (req, res) => {
//   res.send("--test \n API is live.");
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// module.exports = app;
