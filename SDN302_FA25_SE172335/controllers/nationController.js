const Food = require("../models/food");
const Nation = require("../models/nation");

exports.getAllNations = async (req, res) => {
  try {
    const nations = await Nation.find({});
    if (!nations) {
      res.status(404).json({ message: "no nations found" });
    }
    return res.status(201).json({ success: true, data: nations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createNation = async (req, res) => {
  try {
    const { nationName, continent } = req.body;
    if (!nationName || !continent) {
      res.status(404).json({
        success: false,
        message: "nationName and continent are required",
      });
    }
    const nations = await Nation.create({ nationName, continent });
    return res.status(201).json({ success: true, data: nations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getDetailNation = async (req, res) => {
  try {
    const { id } = req.params;
    const nations = await Nation.findById(id);
    if (!nations) {
      res.status(404).json({ success: false, message: "nation not found" });
    }
    return res.status(201).json({ success: true, data: nations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateNation = async (req, res) => {
  try {
    const { id } = req.params;
    const { nationName, continent } = req.body;
    if (!nationName || !continent) {
      return res.status(404).json({
        success: false,
        message: "nationName and contient are required",
      });
    }
    const nations = await Nation.findByIdAndUpdate(
      id,
      {
        nationName,
        continent,
      },
      { new: true },
    );
    if (!nations) {
      return res
        .status(404)
        .json({ success: false, message: "nation not found" });
    }
    return res.status(201).json({ success: true, data: nations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteNation = async (req, res) => {
  try {
    //1.tìm xem nation có food đó ko nếu có thì ko đc xóa còn ko thì xóa
    const findNation = await Food.countDocuments({ nation: req.params.id });
    if (findNation > 0) {
      return res.status(400).json({
        status: false,
        message: "Cannot delete nation with existing foods",
      });
    }
    const { id } = req.params;
    const nations = await Nation.findByIdAndDelete(id, { new: true });
    if (!nations) {
      return res
        .status(404)
        .json({ success: false, message: "nations not found" });
    }
    return res
      .status(201)
      .json({ success: true, message: "nation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
