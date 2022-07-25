const router = require("express").Router();

const { postIdea } = require("../controllers/ideaControllers/postIdea");
const { getIdea } = require("../controllers/ideaControllers/getIdea");
const { getUserIdeas } = require("../controllers/ideaControllers/myIdeas");
const {
  deleteIdea,
  deleteIdeaMany,
} = require("../controllers/ideaControllers/deleteIdea");
const { updateIdea } = require("../controllers/ideaControllers/updateIdea");
const { searchIdea } = require("../controllers/ideaControllers/searchIdea");
const { contactForm } = require("../controllers/ideaControllers/contactForm");
const auth = require("../middlewares/auth");

router.post("/postIdea", auth, postIdea);
router.get("/ideas", auth, getIdea);
router.get("/userIdeas/:usersID", auth, getUserIdeas);
router.get("/deleteIdea/:id", auth, deleteIdea);
router.get("/deleteIdeaMany", auth, deleteIdeaMany);
router.post("/updateIdea/:id", auth, updateIdea);
router.get("/searchidea", auth, searchIdea);
router.get("/contactform", auth, contactForm);

module.exports = router;
