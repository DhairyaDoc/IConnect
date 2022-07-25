const Idea = require("../../models/idea");

exports.deleteIdea = async (req, res) => {
  try {
    let id = req.params.id;

    await Idea.findByIdAndRemove(id);
    res.status(200).json({ message: "Deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
exports.deleteIdeaMany = async (req, res) => {
  try {
    await Idea.deleteMany({ image: "image" });
    res.status(200).json({ message: "Deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
