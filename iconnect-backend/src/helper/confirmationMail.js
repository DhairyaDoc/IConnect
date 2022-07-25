const ejs = require("ejs");
const { gmailUser } = require("../config/app");
const { mailTransporter } = require("./nodemail");

// generate template for forgot password mail
const sendForgotPassMail = (name, link, email) => {
  try {
    ejs.renderFile(
      __dirname + "/template/forgotPassMail.ejs",
      { name: name, confirm_link: link },
      async (err, data) => {
        if (err) {
          res.status(404).json({ message: error.message, success: false });
        } else {
          await mailTransporter.sendMail({
            from: `"iConnect" <${gmailUser}>`,
            to: email,
            subject: "Reset your iConnect password",
            html: data, // html body
          });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

// generate and send verification of email address
const sendEVT = (res, title, message) => {
  try {
    ejs.renderFile(
      __dirname + "/template/verifiedEmail.ejs",
      { title, message },
      function (err, data) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(data);
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
};

module.exports = { sendForgotPassMail, sendEVT };
