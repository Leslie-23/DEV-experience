const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtAuth");

// User Login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log("Request Body:", req.body); // --test flag

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("Password Match:", isMatch); // --test flag

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, "user");
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Logout
exports.userLogout = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};
