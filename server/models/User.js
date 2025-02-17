const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    languages: { type: [String], default: [] },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },

  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// if the above is uncommented. then remove the hashing logic from the controller --> might be modifying the password giving login issues

module.exports = mongoose.model("User", userSchema);
