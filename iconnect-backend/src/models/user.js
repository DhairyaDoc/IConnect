const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
    },
    role: {
      type: String,
      enum: ["ideator", "investor"],
      default: "ideator",
    },
    isPremiumMember: {
      type: mongoose.Schema.Types.Boolean,
    },
    premiumMembershipType: {
      type: mongoose.Schema.Types.String,
    },
    companyName: {
      type: String,
      maxlength: 255,
    },
    totalInvestments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
