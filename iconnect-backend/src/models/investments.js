const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    investorId: mongoose.Schema.ObjectId,
    ideaId: mongoose.Schema.ObjectId,
    amount: Number,
    paybackPlan: {
      type: String,
      enum: ["stake", "debt"],
      default: "ideator",
    },
    stake: Number,
    debtInterest: Number,
    paid: { type: Boolean, default: false },
    isPending: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Investment = mongoose.model("investment", investmentSchema);
module.exports = Investment;
