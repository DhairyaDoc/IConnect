const Idea = require("../../models/idea");

exports.getUserIdeas = async (req, res) => {
  try {
    const userID = req.params.usersID;
    if (userID) {
      Idea.find({ createdBy: userID }).then((userIdeas) => {
          res.status(200).json({ ideas: userIdeas });
      });
    }
  } catch (error) {
    res.status(500).json({ ideas: error.message });
  }
};
