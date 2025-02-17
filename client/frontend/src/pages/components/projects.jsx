import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Clock } from "lucide-react";

const API_URL = "http://localhost:5000/api/projects";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open modal for new or edit project
  const openModal = (project = null) => {
    setEditingProject(project);
    setForm(project || { title: "", description: "" });
    setModalOpen(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save project (Add/Edit)
  const saveProject = async () => {
    try {
      if (editingProject) {
        await axios.put(`${API_URL}/${editingProject._id}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setModalOpen(false);
      fetchProjects(); // Refresh project list
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProjects(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-b from-green-500 to-green-700">
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-3xl font-bold text-white ">My Projects</h1>
          <button
            onClick={() => openModal()}
            className="flex items-center bg-white text-green-500 px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            <Plus size={20} className="mr-2" /> Add Project
          </button>
        </div>

        {/* Show Loading State */}
        {loading && (
          <p className="text-center text-gray-500">Loading projects...</p>
        )}

        {/* Show No Projects Message */}
        {!loading && projects.length === 0 && (
          <div className="text-center text-gray-500 p-6 bg-gray-100 rounded-lg shadow-inner">
            <p className="text-lg font-semibold">No projects yet.</p>
            <p className="text-sm">
              Click the <b>Add Project</b> button to start your first project.
            </p>
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          {!loading &&
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-5 rounded-lg shadow-md border border-gray-200"
              >
                {/* Project Info */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-black">
                      {project.title}
                    </h2>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => openModal(project)}
                      className="text-gray-700 hover:text-green-500 transition"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="text-gray-700 hover:text-red-500 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Timeline Section */}
                <div className="mt-3 bg-gray-50 p-3 rounded-lg shadow-inner">
                  <h3 className="text-sm font-bold text-gray-700 flex items-center">
                    <Clock size={16} className="mr-1" /> Project Timeline
                  </h3>
                  <ul className="mt-2 text-gray-600 text-sm space-y-1">
                    {project.timeline.map((entry, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-green-500">●</span>
                        <span>
                          {entry.action} at{" "}
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                {editingProject ? "Edit Project" : "New Project"}
              </h2>
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProject}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  {editingProject ? "Save Changes" : "Add Project"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
