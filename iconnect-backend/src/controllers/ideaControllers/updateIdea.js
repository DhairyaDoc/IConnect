const Idea = require("../../models/idea");

exports.updateIdea = async (req, res) => {
  try {
    const {
      projectName,
      investmentRequired,
      isInvestmentDone,
      shortDescription,
      image,
    } = req.body;
    const id = req.params.id;

    await Idea.findByIdAndUpdate(id, {
      projectName,
      investmentRequired,
      isInvestmentDone,
      shortDescription,
      image,
    });
    res
      .status(200)
      .json({ message: "Idea updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
