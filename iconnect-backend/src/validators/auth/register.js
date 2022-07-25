const { body } = require("express-validator");

exports.rules = (() => {
  return [
    body("firstName").notEmpty().isLength({ min: 3, max: 255 }),
    body("lastName").notEmpty().isLength({ min: 3, max: 255 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5, max: 255 }),
    body("companyName").isLength({ max: 255 }),
  ];
})();
