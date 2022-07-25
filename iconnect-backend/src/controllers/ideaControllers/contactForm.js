const { baseURL, gmailPassword } = require("../../config/app");
const { contactFormMail } = require("../../helper/contactFormMail");
const User = require("../../models/user");
const Idea = require("../../models/idea");

exports.contactForm = async (req, res) => {
    try {
        const name = req.query.name;
        const email = req.query.email;
        const message = req.query.message;
        const idea_id = req.query.ideaId;

        const user_id = await Idea.findById(idea_id)
        const user = await User.findById(user_id.createdBy);

        const ideator_email=user.email;
        const ideator_name=user.firstName+" " +user.lastName;

        contactFormMail(ideator_name, message, ideator_email.trim(), name,  email );
        res.status(200).json({ message: "Email sent", success: true });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}