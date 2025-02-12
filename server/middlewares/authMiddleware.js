const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  //console.log("Received Token:", req.header("Authorization"));

  const token = authHeader.replace("Bearer ", "").trim();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.id, role: decoded.role }; // Use `userId` instead of email
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};
