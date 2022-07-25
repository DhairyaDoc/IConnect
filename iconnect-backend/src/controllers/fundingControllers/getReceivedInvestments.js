const Investments = require("../../models/investments");

exports.getReceivedInvestments = async (req, res) => {
  try {
    Investments.aggregate(
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
            "ideas.createdBy": req.user.id,
            isPending: false,
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
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
