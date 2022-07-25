const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../../models/user");
const { jwt_Secret } = require("../../config/app");
const { sendEVT } = require("../../helper/confirmationMail");
const htmlpath = path.join(__dirname, "../../../public/index.html");

const resetPassword = async (req, res) => {
  const { params } = req;
  try {
    const token = params.id;
    const decoded = jwt.verify(token, jwt_Secret);
    const user = await User.findById(decoded.id);
    if (user) {
      res.sendFile(htmlpath);
    } else {
      sendEVT(
        res,
        "Link expired!",
        "Looks like reset password link has been expired.",
      );
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      sendEVT(
        res,
        "Link expired!",
        "Looks like reset password link has been expired.",
      );
    } else {
      sendEVT(
        res,
        "Something is wrong!!",
        "Please try again or choose option for forgot password from app again.",
      );
    }
  }
};

const resetPasswordPost = async (req, res) => {
  try {
    const { password, token } = req.body;
    const decoded = jwt.verify(token, jwt_Secret);
    const user = await User.findById(decoded.id);
    bcrypt.hash(password, 12).then(async hash => {
      let hashedPassword = hash;
      await User.findOneAndUpdate(
        { email: user.email },
        { password: hashedPassword },
      );
      return res.status(200).send({
        success: true,
        message: "Your password is changed successfully",
      });
    });
  } catch (error) {
    const { errors } = error;
    if (errors && errors.password) {
      res.send({
        error: ["Password should have atleast 5 charcter"],
        status: false,
      });
    } else {
      res.send({
        error: ["Link expired! or something is wrong"],
        status: false,
      });
    }
  }
};

module.exports = {
  resetPassword,
  resetPasswordPost,
};
