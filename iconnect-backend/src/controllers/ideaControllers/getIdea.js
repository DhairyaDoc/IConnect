const Idea = require("../../models/idea");

exports.getIdea = async (req, res) => {
  try {
    const getIdea = await Idea.find();
    res.status(200).json({ posts: getIdea });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
