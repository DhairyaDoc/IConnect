const User = require("../../models/user");
const Investment = require("../../models/investments");
const Idea = require("../../models/idea");
const mongoose = require("mongoose");
const {
  maxInvestment,
  maxInvestmentSilver,
  maxInvestmentGold,
  minInvestmentDone,
  limitIncrementPercentagePerIdea,
} = require("../../config/app");

exports.invest = async (req, res) => {
  try {
    const { investorId, ideaId, amount, paybackPlan, stake, debtInterest } =
      req.body;
    let idForIdea = mongoose.Types.ObjectId(ideaId);
    let idForInvestor = mongoose.Types.ObjectId(investorId);
    const idea = await Idea.findById(ideaId);
    const investor = await User.findById(investorId);
    let maxInvestmentForInvestor = maxInvestment;
    if (investor.isPremiumMember) {
      if (investor.premiumMembershipType == "Gold") {
        maxInvestmentForInvestor = maxInvestmentGold;
      } else if (investor.premiumMembershipType == "Silver") {
        maxInvestmentForInvestor = maxInvestmentSilver;
      } else {
        maxInvestmentForInvestor = idea.investmentRequired;
      }
    }

    const investmentLimitForInvestor =
      maxInvestmentForInvestor +
      (investor.totalInvestments *
        limitIncrementPercentagePerIdea *
        maxInvestmentForInvestor) /
        100;

    if (amount > idea.investmentRequired) {
      res.status(400).json({
        message:
          "Investment amount can not be greater than investment required",
        success: false,
      });
    } else if (amount > investmentLimitForInvestor) {
      res.status(400).json({
        message:
          "Please upgrade your account to extend your investment limit or invest in more ideas",
        success: false,
      });
    } else {
      const newInvestment = new Investment({
        investorId: idForInvestor,
        ideaId: idForIdea,
        amount,
        paybackPlan,
        stake,
        debtInterest,
      });

      await newInvestment.save();
      res.status(200).json({
        message: "Investment request raised successfully",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
