const express = require("express");
const {
  adminLogin,
  adminLogout,
} = require("../controllers/admin-login-controller");
const User = require("../models/User");

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);

router.get("/admins", async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }); // Fetch users with role "admin"
    res.status(200).json({ admins });
    console.log(admins);

    const result = await User.updateOne(
      { email: "john.paul@example.com" }, // Match the user by email
      { $set: { role: "admin" } } // Set the role to "admin"
    );

    console.log("Update Result:", result);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({
      message: "Failed to fetch admins",
      error: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;
