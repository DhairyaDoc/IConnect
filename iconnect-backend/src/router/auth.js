const router = require("express").Router();

const { register } = require("../controllers/authControllers/register");
const { login, oAuthLogin } = require("../controllers/authControllers/Login");
const {
  validateToken,
} = require("../controllers/authControllers/validateToken");
const {
  forgotPassword,
} = require("../controllers/authControllers/forgotPassword");
const {
  resetPassword,
  resetPasswordPost,
} = require("../controllers/authControllers/ResetPassword");
const { validate } = require("../validators");
const { rules: registrationRules } = require("../validators/auth/register");
const auth = require("../middlewares/auth");

router.post("/register", [registrationRules, validate], register);
router.post("/login", login);
router.post("/oAuthLogin", oAuthLogin);
router.post("/forgotPassword", forgotPassword);
router.get("/resetPassword/:id", resetPassword);
router.post("/resetPassword", resetPasswordPost);
router.get("/validateToken", auth, validateToken);

module.exports = router;
