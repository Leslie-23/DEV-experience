const Project = require("../models/projects");

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a project
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = new Project({
      title,
      description,
      timeline: [{ action: "Project Created" }],
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        $push: { timeline: { action: "Project Updated" } },
      },
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
