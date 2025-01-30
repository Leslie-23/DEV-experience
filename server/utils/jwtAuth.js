// const jwt = require("jsonwebtoken");

// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: "24h",
//   });
// };

// module.exports = { generateToken };
const jwt = require("jsonwebtoken");

const generateToken = (id, role, email) => {
  return jwt.sign({ id, role, email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = { generateToken };
