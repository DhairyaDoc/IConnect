const Investment = require("../../models/investments");

exports.withdrawInvestment = async (req, res) => {
  try {
    const { investorId, ideaId } = req.body;
    await Investment.findByIdAndUpdate(investorId, {
      $inc: { totalInvestments: -1 },
    });
    await Investment.findOneAndRemove({ investorId, ideaId });
    res
      .status(200)
      .json({
        message: "Your investment have been withdrawn successfully",
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
