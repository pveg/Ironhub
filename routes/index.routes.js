const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Project = require("../models/Project.model")

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.user
  console.log({user})
  res.render("index", {user});
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

router.get('/profile', (req, res, next) => {
  const user  = req.session.user;
  res.render('auth/profile', user);
})

router.get('/profile/:username', (req, res, next) => {
  const {username} = req.params;
  User.findOne({username: username})
  .then(user => {
    res.render('auth/profile', user)})
  .catch(err => next(err));
})

router.get("/:username/edit-profile", isLoggedIn, (req, res, next) => {
  res.render("edit-profile");
});

router.post("/:username/edit-profile", (req, res, next) => {
  const { password, name, surname } = req.body;
});

module.exports = router;

