const express = require("express");
const UserStreak = require("../models/user-streak");

const router = express.Router();

router.get("/streak/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const streakData = await UserStreak.findOne({ user: userId });

    if (!streakData) return res.json({ streakCount: 0 });

    res.json({ streakCount: streakData.streakCount });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
