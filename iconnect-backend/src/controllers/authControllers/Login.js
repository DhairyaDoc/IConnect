const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { jwt_Secret } = require("../../config/app");
const { generateToken } = require("../../helper/generateToken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }).then(async fetchedUser => {
      if (fetchedUser) {
        bcrypt.compare(
          password,
          fetchedUser.password,
          async (error, isSuccessfullyLoggedIn) => {
            if (error) {
              res.json({
                error: error,
              });
            }

            if (isSuccessfullyLoggedIn) {
              const loginToken = await generateToken(fetchedUser);

              res.json({
                message: "Successfully logged in!",
                loginToken,
                fetchedUser,
                success: true,
              });
            } else {
              res.json({
                message: "Password does not match",
                success: false,
              });
            }
          },
        );
      } else {
        res.json({
          message: "User is not registered",
          success: false,
        });
      }
    });
  } catch (exception) {
    return res.status(500).json({ message: exception.message });
  }
};

const oAuthLogin = async (req, res) => {
  try {
    const { firstName, lastName, email, tokenId, role } = req.body;
    if (!firstName || !lastName || !email) {
      return res
        .status(500)
        .json({ success: false, message: "All fields are not present" });
    }
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      await User.findOneAndUpdate({ email: email }, { role: role });
      const updatedUser = await User.findOne({ email });
      const token = await generateToken(updatedUser);
      return res.json({
        message: updatedUser,
        token,
        userExisted: true,
        success: true,
      });
    } else {
      const user = new User({
        firstName,
        lastName,
        email,
        role,
        token: tokenId,
      });
      const token = await generateToken(user);

      user
        .save()
        .then(async userData => {
          return res
            .status(200)
            .json({ message: userData, token, success: true });
        })
        .catch(error => {
          return res.json({ message: error.message, success: false });
        });
    }
  } catch (exception) {
    return res.status(500).json({ message: exception.message, success: false });
  }
};

module.exports = {
  login,
  oAuthLogin,
};
