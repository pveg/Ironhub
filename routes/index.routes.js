const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Project = require("../models/Project.model")
const fileUploader = require('../config/cloudinary.config');
const Comment = require("../models/Comment.model");

/* DELETE - IT WORKS ON THE DATABASE BUT NOT ON THE FRONT-END */

router.get('/profile/:username/delete-profile', isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  User.findOneAndDelete({username: username})
  .then(() => res.redirect('/logout'))
  .catch(err => next(err));
})


/* GET Home Page/Sign Up */
router.get("/", (req, res, next) => {
  const user = req.session.user
  res.render("index", {user});
});

/* SEARCH */

router.get("/search", isLoggedIn, (req, res, next) => {
  const user = req.session.user
  res.render("search", {user});
});

//maybe need to use query to display results?

router.post("/search", (req, res, next) => {
  const { course, campus, name } = req.body;
  res.send("search/results", { course, campus, name });
});

/* SEARCH RESULTS */

router.get("/search/results", isLoggedIn, (req, res, next) => {
  const user = req.session.user
  res.render("search-results", {user});
});

/* PROFILE */

router.get('/profile/:username', isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  User.findOne({username: username})
  .then(user => {
    res.render('auth/profile', user)})
  .catch(err => next(err));
})

/* EDIT PROFILE */

router.get("/profile/:username/edit-profile", isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  User.findOne({username: username})
  .then((user) => { console.log(user)
    res.render('auth/edit-profile', user)})
  .catch(err => next(err))
});

router.post("/profile/:username/edit-profile", fileUploader.single('profilepicture'), (req, res, next) => {
  const {username} = req.params;
  const { password, name, surname, campus, course } = req.body;

  if(req.file) {
    User.findOneAndUpdate({username: username}, {password, name, surname, campus, course, username, profilepicture: req.file.path})
    .then(() => res.redirect(`/profile/${username}`))
    .catch(err => next(err))
  } else {
    User.findOneAndUpdate({username: username}, {password, name, surname, campus, course, username})
    .then(() => res.redirect(`/profile/${username}`))
    .catch(err => next(err))
  }
});

/* PROJECTS */

router.get("/:username/projects", isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  User.findOne({username: username}) // Populate
  .then(user => {
    res.render('projects/project', user)})
  .catch(err => next(err));
})

router.get('/:username/projects/new', isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  User.findOne({username: username}) // Populate
  .then(user => {
    res.render('projects/new-project', user)})
  .catch(err => next(err));
})





module.exports = router;