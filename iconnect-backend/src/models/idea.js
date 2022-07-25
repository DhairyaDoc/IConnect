const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    investmentRequired: {
      type: Number,
      required: true,
    },
    isInvestmentDone: {
      type: Boolean,
      default: false,
    },
    shortDescription: {
      type: String,
      minlength: 5,
    },
    investmentRaised: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idea", ideaSchema);

const User = mongoose.model("Idea", ideaSchema);
module.exports = User;
