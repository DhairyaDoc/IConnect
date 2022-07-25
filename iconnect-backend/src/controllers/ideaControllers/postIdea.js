const Idea = require("../../models/idea");

exports.postIdea = async (req, res) => {
  try {
    const {
      projectName,
      investmentRequired,
      isInvestmentDone,
      shortDescription,
      image,
    } = req.body;

    const idea = new Idea({
      projectName,
      image,
      createdBy: req.user.id,
      investmentRequired,
      isInvestmentDone,
      shortDescription,
    });
    await idea.save();
    res.status(200).json({ message: idea, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
