const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeline: [
    {
      timestamp: { type: Date, default: Date.now },
      action: { type: String },
    },
  ],
});

module.exports = mongoose.model("Project", ProjectSchema);
