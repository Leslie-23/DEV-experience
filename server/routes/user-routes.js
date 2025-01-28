const express = require("express");
const {
  userLogin,
  userLogout,
} = require("../controllers/user-login-controller");
const {
  userSignup,
  adminSignup,
  deleteUser,
  updateUser,
  viewAllUsers,
  viewUser,
} = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", userLogin);
router.post("/logout", userLogout);

// User and Admin Routes
router.post("/signup", userSignup); // User signup
router.post("/admin/signup", adminSignup); // Admin signup

router.delete("/delete/:userId", deleteUser); // Delete user
router.put("/update/:userId", updateUser); // Update user
router.get("/viewAll", viewAllUsers); // View all users
router.get("/view/:userId", viewUser); // View specific user

module.exports = router;
