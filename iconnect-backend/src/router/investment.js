const router = require("express").Router();

const {
  getInvestments,
  getInvestmentRequest,
  acceptInvestment,
  rejectInvestment,
  investmentPayment,
  makePayment,
} = require("../controllers/investmentController/investmentController");
const auth = require("../middlewares/auth");

router.get("/getInvestment/:investorID", auth, getInvestments);
router.get("/getInvestment/:investorID/:isPending", auth, getInvestments);
router.get("/getInvestmentRequest/:userID", auth, getInvestmentRequest);
router.put("/acceptInvestment", auth, acceptInvestment);
router.put("/rejectInvestment", auth, rejectInvestment);
router.get("/investmentPayment/:userID", auth, investmentPayment);
router.post("/makepayment", makePayment);
module.exports = router;
