const router = require("express").Router();

const { updateUser } = require("../controllers/userController/user");
const auth = require("../middlewares/auth");

router.put("/update/:userID", auth, updateUser);

module.exports = router;
