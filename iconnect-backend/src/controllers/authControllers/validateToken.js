const validateToken = async (req, res) => {
  res.status(200).json({ message: "Authenticated", success: true });
};

module.exports = {
  validateToken,
};
