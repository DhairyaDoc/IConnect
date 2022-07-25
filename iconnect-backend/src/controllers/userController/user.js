const User = require("../../models/user");

exports.updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      companyName,
      isPremiumMember,
      premiumMembershipType,
    } = req.body;
    const id = req.params.userID;

    if (id) {
      User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            companyName: companyName,
            isPremiumMember: isPremiumMember,
            premiumMembershipType: premiumMembershipType,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something went wrong!", err);
          } else {
            res.status(200).json({ user: doc });
          }
        },
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
