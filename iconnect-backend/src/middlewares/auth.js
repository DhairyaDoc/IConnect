const jwt = require("jsonwebtoken");
const { jwt_Secret } = require("../config/app");

function auth(req, res, next) {
  let authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: "Unauthenticated", success: false });
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthenticated", success: false });
    } else {
      try {
        const decoded = jwt.verify(token, jwt_Secret);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(400).json({ message: "Unauthenticated", success: false });
      }
    }
  }
}

module.exports = auth;
