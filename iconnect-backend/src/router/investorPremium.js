const router = require("express").Router();
const commitTransactionToStripe = require("../controllers/investorPremiumController/investorPremiumController.js");
const auth = require("../middlewares/auth");

router.post("/", auth, commitTransactionToStripe);

module.exports = router;
