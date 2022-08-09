const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Project = require("../models/Project.model")
const fileUploader = require('../config/cloudinary.config');
const Comment = require("../models/Comment.model");
const { populate } = require("../models/User.model");


/* DELETE - IT WORKS ON THE DATABASE BUT NOT ON THE FRONT-END */

router.get('/profile/:username/delete-profile', isLoggedIn, (req, res, next) => {
  const {username} = req.params;

  User.findOneAndDelete({username: username})
  .then((user) =>{
     Project.deleteMany({_id: {$in: user.projects}})
     .then(() => {

       req.session.destroy((err) => {
         if (err) {
           return res
           .status(500)
           .render('auth/logout', { errorMessage: err.message });
          }})
        })
      })
    .then(() => {
  res.redirect('/auth/signup')
})
  .catch(err => res.redirect('/logout'))
});

/* router.get('/profile/:username/delete-project/:id', isLoggedIn, (req, res, next) => {

  const {username, id} = req.params;
  User.findOne({username: username})
  .then(user => {
    Project.findByIdAndDelete(id)
    .then(() => {
      user.projects.pull(id);
      user.save();
      res.redirect(`/profile/${username}`)
    })
  })
  .catch(err => res.redirect('/logout'))
}) */


/* GET Home Page/Sign Up */
router.get("/", (req, res, next) => {
  const user = req.session.user
  res.render("index", {user});
});

/* SEARCH */

router.get('/search', (req, res, next) => {
  res.render('search')
});

router.get("/search/results", isLoggedIn, (req, res, next) => {
  const user = req.session.user
  const { course, campus, name } = req.query;

  User.find({
    $or: [
      { course: course },
      { campus: campus },
      { name: name }
    ]
  })
  .populate('projects')
  .then((users) => {
    res.render('search-results', {users})
  })
.catch(err => next(err))
});

//maybe need to use query to display results?

/* router.post("/search", (req, res, next) => {
  const { course, campus, name } = req.query;
  User.find({username: username})
  .then(() => {
    res.redirect("search/results", { course, campus, name });
  })
}); */

/* SEARCH RESULTS */

/* router.get("/search/results", isLoggedIn, (req, res, next) => {
  const user = req.session.user
  res.render("search-results");
});
 */
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
  User.findOne({username: username})
  .populate('projects') 
  .then(user => {
    res.render('projects/project', {user})})
  .catch(err => next(err));
})


/* NEW PROJECT */


router.get('/:username/projects/new', isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  User.findOne({username: username})
  .populate('projects') 
  .then(user => {
    res.render('projects/new-project', {user})})
  .catch(err => next(err));
})

router.post('/:username/projects/new', fileUploader.single('image') , isLoggedIn, async (req, res, next)=>{
  try {
    const {username} = req.params;
    const {title, description, link} = req.body;
    const user = req.session.user;
    
    
    if(req.file) {
      const newProject = await Project.create({author: user._id, title, description, link, image: req.file.path})
      await User.findOneAndUpdate({username: username}, { $push: { projects: newProject._id } });
      res.redirect(`/${username}/projects`)
    } else {
      const newProject = await Project.create({author: user._id, title, description, link})
      await User.findOneAndUpdate({username: username}, { $push: { projects: newProject._id } });
      res.redirect(`/${username}/projects`)
    }
    
  } catch (error) {
    res.status(400).render("projects/new-project", {errorMessage: "Error creating project"});
    next()
  }
})


/* EDIT PROJECT */


router.get("/projects/:projectid/edit-project", isLoggedIn, (req, res, next) => {
  const {projectid} = req.params;
  Project.findById(projectid)
  .then((user) => { console.log(user)
    res.render('projects/edit-project', user)})
  .catch(err => next(err))
});

router.post("/projects/:projectid/edit-project", fileUploader.single('profilepicture'), (req, res, next) => {
  const {username, projectid} = req.params;
  console.log(projectid)
  const {title, description, link} = req.body;

  if(req.file) {
    User.findOneAndUpdate({projectid: projectid}, {description, title, link, image: req.file.path})
    .then(() => res.redirect(`/profile/${username}`))
    .catch(err => next(err))
  } else {
    User.findOneAndUpdate({projectid: projectid}, {description, title, link, image: req.file.path})
    .then(() => res.redirect(`/profile/${username}`))
    .catch(err => next(err))
}});


/* DELETE PROJECT */


router.get('/projects/:projectid/delete-project', isLoggedIn, (req, res, next)=> {
const {projectid} = req.params;
const id = req.session.user._id;

Project.findByIdAndDelete(projectid)
.then(() =>{
return User.findByIdAndUpdate(id, {$pull: {projects: projectid}} )
})
 .then(()=> {
   res.redirect('/search')})
.catch(err => res.redirect('/'))
});


/* COMMENTS */


router.post('/:projectid/comments', isLoggedIn, (req, res, next)=> {
const projectid = req.params.id;
const user = req.session.user;
const comment = JSON.parse(JSON.stringify(req.body));

Project.findByIdAndUpdate(projectid)
.then(()=> {
return Comment.create({author: user, project: projectid, comment})
})
.then(() => {
  res.redirect(`/${user.username}/projects`)
})
.catch(err => next(err))
})


module.exports = router;