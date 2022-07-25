const Idea = require("../../models/idea");

exports.searchIdea = async (req, res) => {
  let searchQuery = req.query.searchQuery;
  try {
    const title = new RegExp(searchQuery, "i");
    const ideas = await Idea.find({
      $or: [{ projectName: title }, { shortDescription: title }],
    });
    res.status(200).json({ data: ideas });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
