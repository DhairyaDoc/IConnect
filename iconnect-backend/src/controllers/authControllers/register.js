const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { generateToken } = require("../../helper/generateToken");

exports.register = (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      companyName,
      role,
      isPremiumMember = false,
      premiumMembershipType = "none",
    } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ error: "Please add all the fields!" });
    }

    User.findOne({ email: email }).then(fetchedUser => {
      if (fetchedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with that email!" });
      }

      bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({
          firstName,
          lastName,
          email,
          role,
          password: hashedPassword,
          companyName,
          isPremiumMember,
          premiumMembershipType,
        });

        user.save().then(async userData => {
          const token = await generateToken(userData);
          res.status(200).json({ token, data: userData });
        });
      });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
