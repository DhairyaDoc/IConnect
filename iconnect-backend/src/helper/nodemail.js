const nodeMailer = require("nodemailer");
const { gmailUser, gmailPassword } = require("../config/app");

const mailTransporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailPassword, // naturally, replace both with your real credentials or an application-specific password
  },
});

module.exports = { mailTransporter };
