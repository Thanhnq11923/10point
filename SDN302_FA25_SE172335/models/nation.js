const mongoose = require("mongoose");

const nationSchema = new mongoose.Schema(
  {
    nationName: {
      type: String,
      required: true,
      unique: true,
    },
    continent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Nation = mongoose.model("nations", nationSchema);
module.exports = Nation;
