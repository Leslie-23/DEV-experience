require("dotenv").config(); // Load environment variables
require("./scheduler/problemSetScheduler"); // Start the cron job when server runs
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const userAdminRoutes = require("./routes/user-routes");
const userReminderRoutes = require("./routes/reminder-routes");
const submissionRoutes = require("./routes/submission-routes");
const userStreakRoutes = require("./routes/user-streak-routes");
const projectRoutes = require("./routes/project-routes");
const snippetRoutes = require("./routes/snippet-routes");

// // clerk stuff. for passing the tokens
// const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
// const clerkAuthMiddleware = ClerkExpressWithAuth({
//   publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
//   secretKey: process.env.CLERK_SECRET_KEY,
// });

const app = express();
app.use(express.json()); // To parse JSON bodies
// app.use(ClerkExpressWithAuth());
app.options("*", cors()); // Enable CORS for all routes. CORS is a real security risk and a B*tch to set up
try {
  connectDB();

  // Use CORS middleware
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://dev-experience-sj2j-kbjftg70q-leslie-23s-projects.vercel.app/",
      ], // Allow these origins (dev and prod)
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
      credentials: true, // Allow cookies and authorization headers
    })
  );

  // favico issues in vercel
  app.get("/favicon.ico", (req, res) => res.status(204).end());

  // user related routes
  app.use("/api/user", userRoutes);
  app.use("/api/users", userAdminRoutes);
  app.use("/api/user", userReminderRoutes);

  // Submission routes
  app.use("/api/submission", submissionRoutes);
  app.use("/api/submission", userStreakRoutes);

  // Project routes
  app.use("/api/projects", projectRoutes);

  // snippet and comments routes
  app.use("/api/snippets", snippetRoutes);

  // Home Route
  app.get("/", (req, res) => {
    const data = {
      message: "API is live",
      status: 200,
      app_name: "Dev-experience API",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime().toFixed(2) + " seconds",
      server_time: new Date().toISOString(),
      client_ip: req.ip,
      deployed_on: "Render || Vercel",
    };
    res.json(data);
  });

  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
  app.get("/test", (req, res) => {
    res.send("--test \n API is live.");
  });

  // Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  module.exports = app;
} catch (err) {
  console.error(err);
} finally {
  module.exports = app;
}
