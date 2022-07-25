const ejs = require("ejs");
const { gmailUser } = require("../config/app");
const { mailTransporter } = require("./nodemail");

const contactFormMail = (ideator_name, message, ideator_email, name, email) => {
    try {
        ejs.renderFile(
            __dirname + "/template/contactFormMail.ejs",
            {ideator_name: ideator_name, message: message, ideator_email: ideator_email, name: name, email: email },
            async (err, data) => {
                if (err) {
                    res.status(404).json({ message: error.message, success: false });
                }
                else{
                    const mail = {
                        from: `"iConnect" <${gmailUser}>`,
                        to: ideator_email,
                        subject: "Contact Request",
                        html: data,
                    };

                    await mailTransporter.sendMail(mail);
                }
            }
        );
    } catch (error) {
        res.status(404).json({ message: error.message, success: false });
    }
};

module.exports = { contactFormMail };