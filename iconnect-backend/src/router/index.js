const router = require("express").Router();

router.use("/", require("./auth"));
router.use("/", require("./ideas"));
router.use("/", require("./userUpdate"));
router.use("/investments", require("./funding"));
router.use("/", require("./investment"));
router.use("/checkoutPremium", require("./investorPremium"));
router.use("/checkoutInvestmentRepayment", require("./investmentRepayment"));

module.exports = router;
