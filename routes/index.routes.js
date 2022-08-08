const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Project = require("../models/Project.model")


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/search", isLoggedIn, (req, res, next) => {
  res.render("search");
});

router.post("/search", (req, res, next) => {
  const { course, campus, name } = req.body;

  res.send("search/results", { course, campus, name });
});

router.get("/search/results", isLoggedIn, (req, res, next) => {
  res.render("search-results");
});

router.get('/:username', isLoggedIn, (req, res, next) => {
  const { username } = req.params;
  res.render('profile');
});

router.get("/:username/edit-profile", isLoggedIn, (req, res, next) => {
  res.render("edit-profile");
});

router.post("/:username/edit-profile", (req, res, next) => {
  const { password, name, surname } = req.body;
});

module.exports = router;
