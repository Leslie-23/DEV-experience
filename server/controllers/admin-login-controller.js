const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtAuth");

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin._id, admin.role);
    res.status(200).json({ token, adminId: admin._id });
    localStorage.setItem("token", token);
    localStorage.SetItem("adminId", admin.id);
    localStorage.SetItem("adminId", admin._id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Logout
exports.adminLogout = (req, res) => {
  res.status(200).json({ message: "Admin logged out successfully" });
};
