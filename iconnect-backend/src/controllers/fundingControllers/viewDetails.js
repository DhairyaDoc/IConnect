const Investments = require("../../models/investments");
const Ideas = require("../../models/idea");
const mongoose = require('mongoose');

exports.viewDetails = async (req, res) => {
  try {
    const idea_id = mongoose.Types.ObjectId(req.params.id);

    Ideas.aggregate(
      [
        {
          $match: {
            _id: idea_id,
          },
        },
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
          $lookup: {
            from: "users",
            localField: "ideas.investorId",
            foreignField: "_id",
            as: "users",
          }, 
        },
        { $unwind: "$users" },

      ],
      (err, docs) => {
        if (err) {
          res.status(404).json({ investments: err.message, success: false });
        } else {
          res.status(200).json({
            investments: docs,
            success: true,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ investments: error.message, success: false });
  }
};
