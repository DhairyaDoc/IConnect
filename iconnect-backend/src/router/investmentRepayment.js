const router = require("express").Router();
const commitRepaymentToStripe = require("../controllers/investmentController/investmentRepaymentController");
const auth = require("../middlewares/auth");

router.post("/", auth, commitRepaymentToStripe);

module.exports = router;
