const { jwt_Secret } = require("../config/app");
const jwt = require("jsonwebtoken");

const generateToken = user => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    jwt_Secret,
    {
      expiresIn: 3600,
    },
  );
};

module.exports = { generateToken };
