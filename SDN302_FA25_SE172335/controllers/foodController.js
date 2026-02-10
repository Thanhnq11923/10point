const Food = require("../models/food");

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({}).populate("nation");
    res.render("foods", { foods });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const foods = await Food.findByIdAndDelete(id);
    res.redirect("/page/foods");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
