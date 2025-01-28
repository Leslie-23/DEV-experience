require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/user-routes");
const userAdminRoutes = require("./routes/user-routes");

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

app.options("*", cors());

connectDB();

app.use(express.json()); // To parse JSON bodies

app.use("/api/user", userRoutes);
app.use("/api/users", userAdminRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
