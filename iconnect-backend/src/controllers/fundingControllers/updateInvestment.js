const Investment = require("../../models/investments");

exports.updateInvestment = async (req, res) => {
  try {
    const {
      investorId,
      ideaId,
      amount,
      paybackPlan,
      stake,
      debtInterest,
      paid,
    } = req.body;
    const id = req.params.id;

    await Investment.findByIdAndUpdate(id, {
      investorId,
      ideaId,
      amount,
      paybackPlan,
      stake,
      debtInterest,
      paid,
    });
    res
      .status(200)
      .json({
        message: "Your investment details have been updated successfully",
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
