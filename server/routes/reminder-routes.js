const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { setReminder } = require("../controllers/reminder-controller");

router.post("/set-reminder", authMiddleware, setReminder);

module.exports = router;
