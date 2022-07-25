const router = require("express").Router();

const { invest } = require("../controllers/fundingControllers/invest");
const {
  updateInvestment,
} = require("../controllers/fundingControllers/updateInvestment");
const {
  withdrawInvestment,
} = require("../controllers/fundingControllers/withDrawInvestment");
const {
  viewDetails,
} = require("../controllers/fundingControllers/viewDetails");

const auth = require("../middlewares/auth");
const {
  getReceivedInvestments,
} = require("../controllers/fundingControllers/getReceivedInvestments");

router.post("/invest", auth, invest);
router.post("/updateInvestment/:id", auth, updateInvestment);
router.post("/withDrawInvestment/", auth, withdrawInvestment);
router.get("/viewideadetails/:id", auth, viewDetails);
router.get("/getReceivedInvestments", auth, getReceivedInvestments);

module.exports = router;
