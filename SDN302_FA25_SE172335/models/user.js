const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    key: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("users", userSchema);
module.exports = User;
