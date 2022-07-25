const { stripePremiumMembershipSkApiKey } = require("../../config/app");
const stripe = require("stripe")(stripePremiumMembershipSkApiKey);

const commitRepaymentToStripe = async (req, res) => {
  const { token, addresses, amount, investorName } = req.body;
  let bill = {};

  try {
    const member = await stripe.customers.create({
      name: token.card.name,
      email: token.email,
      source: token.id,
    });

    bill = await stripe.charges.create({
      customer: member.id,
      receipt_email: token.email,
      description: `Repayment to ${investorName}`,
      currency: "cad",
      amount: amount * 100,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.json({ bill });
};

module.exports = commitRepaymentToStripe;
