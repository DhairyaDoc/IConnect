const User = require("../../models/user");
const Idea = require("../../models/idea");
const Investment = require("../../models/investments");
const mongoose = require("mongoose");

const stripe = require("stripe")(
  "sk_test_51Kj8TLDUiun6JENAKgMyfjpvSytJ5hdE5VzsjSp0fbdOp7NxoDXwl1wKJHqNs2EinlIyKFBAYlbGrJVE3Dsib3kk00ocFYfc5u",
);

exports.getInvestments = async (req, res) => {
  try {
    const investorID = req.params.investorID;
    const isPending = req.params.isPending === "true";

    if (!investorID && !isPending) {
      res.status(500).json({ success: false, document: "Params not found!" });
    }

    const investorObjectID = mongoose.Types.ObjectId(investorID);

    Idea.aggregate(
      [
        {
          $lookup: {
            from: "investments",
            localField: "_id",
            foreignField: "ideaId",
            as: "ideas",
          },
        },
        { $unwind: "$ideas" },
        {
          $match: {
            "ideas.investorId": investorObjectID,
            "ideas.isPending": isPending,
          },
        },
      ],
      (err, document) => {
        if (err) {
          res.status(500).json({
            success: false,
            docuemnt: err.message,
          });
        }
        res.status(200).json({ success: true, document });
      },
    );
  } catch (error) {
    res.status(500).json({ success: false, document: error.message });
  }
};

exports.getInvestmentRequest = async (req, res) => {
  try {
    const userID = req.params.userID;

    if (!userID) {
      res.status(500).json({ success: false, message: "Params not found!" });
    }

    Investment.aggregate(
      [
        {
          $lookup: {
            from: "ideas",
            localField: "ideaId",
            foreignField: "_id",
            as: "ideas",
          },
        },
        { $unwind: "$ideas" },
        {
          $match: {
            "ideas.createdBy": userID,
            isPending: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "investorId",
            foreignField: "_id",
            as: "investor",
          },
        },
        { $unwind: "$investor" },
      ],
      (err, docs) => {
        if (err) {
          res.status(404).json({ message: err.message, success: false });
        } else {
          res.status(200).json({
            message: docs,
            success: true,
          });
        }
      },
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.acceptInvestment = async (req, res) => {
  try {
    const investmentID = req.body.investmentID;

    if (!investmentID) {
      res
        .status(500)
        .json({ success: false, message: "Investment ID not found!" });
    }

    Investment.findByIdAndUpdate(
      mongoose.Types.ObjectId(investmentID),
      {
        $set: { isPending: false },
      },
      function (err, _docs) {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        }
        res.status(200).json({ success: true, message: "Investment Accepted" });
      },
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.rejectInvestment = async (req, res) => {
  try {
    const investmentID = req.body.investmentID;

    if (!investmentID) {
      res
        .status(500)
        .json({ success: false, message: "Investment ID not found!" });
    }

    Investment.findByIdAndDelete(
      mongoose.Types.ObjectId(investmentID),
      function (err, _docs) {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        }
        res.status(200).json({ success: true, message: "Investment Rejected" });
      },
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.investmentPayment = async (req, res) => {
  try {
    const userID = req.params.userID;

    if (!userID) {
      res.status(500).json({ success: false, data: "Params not found!" });
    }

    Investment.aggregate(
      [
        {
          $lookup: {
            from: "ideas",
            localField: "ideaId",
            foreignField: "_id",
            as: "ideas",
          },
        },
        {
          $unwind: "$ideas",
        },
        {
          $match: {
            investorId: mongoose.Types.ObjectId(userID),
            paid: false,
            isPending: false,
          },
        },
      ],
      (err, doc) => {
        if (err) {
          res.status(500).json({ data: err.message, success: false });
        }

        res.status(200).json({ data: doc, success: true });
      },
    );
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
};

exports.makePayment = async (req, res) => {
  try {
    const { token, email, items } = req.body;

    return stripe.customers
      .create({
        email: email,
        source: token.id,
      })
      .then(customer => {
        stripe.charges.create({
          amount: items.amount * 100,
          currency: "cad",
          customer: customer.id,
          receipt_email: "doctordhairya@gmail.com",
          description: items.ideas.projectName,
        });
      })
      .then(async () => {
        Investment.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(items._id) },
          {
            $set: { paid: true },
          },
          async (err, document) => {
            await Idea.findByIdAndUpdate(document.ideaId, {
              $inc: { investmentRaised: items.amount },
            });
            await User.findByIdAndUpdate(document.investorId, {
              $inc: { totalInvestments: 1 },
            });
            if (err) {
              res.status(500).json({ message: err.message });
            }
            res.status(200).json({ success: true });
          },
        );
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
