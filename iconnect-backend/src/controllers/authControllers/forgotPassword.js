const User = require("../../models/user");
const { baseURL } = require("../../config/app");
const { sendForgotPassMail } = require("../../helper/confirmationMail");
const { generateToken } = require("../../helper/generateToken");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    res
      .status(400)
      .json({ message: "Please enter all the fields", success: false });
  } else {
    if (!emailRegexp.test(email)) {
      return res.status(400).send({ success: false, message: "Invalid Email" });
    }

    User.findOne({ email: email })
      .then(async (user) => {
        if (!user) {
          res.status(400).json({
            message: "No account is registered with this email",
            success: false,
          });
        } else {
          const token = await generateToken(user);

          const link = baseURL + "/resetpassword/" + token;
          sendForgotPassMail(user.firstName, link, email.trim());
          res.status(200).json({ message: "Email sent", success: true });
        }
      })
      .catch((error) =>
        res.status(404).json({ message: error.message, success: false })
      );
  }
};
