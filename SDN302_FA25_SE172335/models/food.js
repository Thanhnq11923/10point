const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
      unique: true,
    },
    foodDescription: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 700,
      max: 1500,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    isVegetarion: {
      type: Boolean,
      default: false,
    },
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nations",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Food = mongoose.model("foods", foodSchema);
module.exports = Food;
