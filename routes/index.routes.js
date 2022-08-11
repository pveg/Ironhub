const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Project = require("../models/Project.model")
const fileUploader = require('../config/cloudinary.config');
const Comment = require("../models/Comment.model");
const { populate } = require("../models/User.model");


/* DELETE PROFILE */


router.get('/profile/:username/delete-profile', isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  
  if (req.session.user.username !== username) {
    return res.redirect("/search")  
  } else {
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
  }
});

/* DELETE PROJECT */


router.get('/projects/:projectid/delete-project', isLoggedIn, (req, res, next)=> {
  const {projectid, username} = req.params;
  const id = req.session.user._id;
  const currentUser = req.session.user
  
  Project.findByIdAndDelete(projectid)
  .then(() =>{
  User.findByIdAndUpdate(id, {$pull: {projects: projectid}} )
  })
  .then(()=> {
     res.redirect(`/profile/${currentUser.username}`)})
     .catch(err => next(err))
  });


/* GET Home Page/Sign Up */


router.get("/", (req, res, next) => {
  const currentUser = req.session.user
  if (!currentUser) {
    res.render("auth/login", {currentUser});
  } else {
    res.render("search", {currentUser});
  }
});


/* SEARCH */


router.get('/search', isLoggedIn, (req, res, next) => {
  const currentUser = req.session.user
  res.render('search', {currentUser})
});


/* SEARCH RESULTS */


router.get("/search/results", isLoggedIn, (req, res, next) => {
  const currentUser = req.session.user
  const { course, campus, name } = req.query;

  User.find({
    $or: [
      { course: course },
      { campus: campus },
      { name: name }
    ]
  })
  .populate('projects')
  .then((results) => {
    console.log(results)
    res.render('search-results', {results, currentUser})
  })
.catch(err => next(err))
});


/* PROFILE */


router.get('/profile/:username', isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  const currentUser = req.session.user

  User.findOne({username: username})
  .then(user => {
    res.render('auth/profile', {currentUser, user})})
  .catch(err => next(err));
})


/* EDIT PROFILE */


router.get("/profile/:username/edit-profile", isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  const currentUser = req.session.user
  if(username !== req.session.user.username) {
    return res.redirect(`/profile/${username}`)
  } else {
    User.findOne({username: username})
    .then((user) => {
      res.render('auth/edit-profile', {user, currentUser})})
      .catch(err => next(err))
    }
});

router.post("/profile/:username/edit-profile", fileUploader.single('profilepicture'), (req, res, next) => {
  const {username} = req.params;
  const {location, email, website, linkedin, instagram, bio, password, name, surname, campus, course } = req.body;
  if(username !== req.session.user.username) {
    return;
  } else {
    if(req.file) {
      User.findOneAndUpdate({username: username}, {location, email, website, linkedin, instagram, bio, password, name, surname, campus, course, username, profilepicture: req.file.path})
      .then(() => res.redirect(`/profile/${username}`))
      .catch(err => next(err))
    } else {
      User.findOneAndUpdate({username: username}, {location, email, website, linkedin, instagram, bio, password, name, surname, campus, course, username})
      .then(() => res.redirect(`/profile/${username}`))
      .catch(err => next(err))
    }
  }
});


/* PROJECTS */


router.get("/:username/projects", isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  const currentUser = req.session.user
  User.findOne({username: username})
  .populate({
    path: 'projects',
    populate: {
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'author',
        model: 'User'
    }
  }})
  .then(user => {
    res.render('projects/project', {user, currentUser})})
  .catch(err => next(err));
})


/* NEW PROJECT */


router.get('/:username/projects/new', isLoggedIn, (req, res, next) => {
  const {username} = req.params;
  const currentUser = req.session.user
  User.findOne({username: username})
  .populate('projects') 
  .then(user => {
    res.render('projects/new-project', {user, currentUser})})
  .catch(err => next(err));
})

router.post('/:username/projects/new', fileUploader.single('image') , isLoggedIn, async (req, res, next)=>{
  try {
    const {username} = req.params;
    const {title, description, link} = req.body;
    const user = req.session.user;

    if (user.username !== username) {
      return res.redirect("/search")
    } else {
      if(req.file) {
        const newProject = await Project.create({author: user._id, title, description, link, image: req.file.path})
        await User.findOneAndUpdate({username: username}, { $push: { projects: newProject._id } });
        res.redirect(`/${username}/projects`)
      } else {
        const newProject = await Project.create({author: user._id, title, description, link})
        await User.findOneAndUpdate({username: username}, { $push: { projects: newProject._id } });
        res.redirect(`/${username}/projects`)
      }
    }
  } catch (error) {
    res.status(400).render("projects/new-project", {errorMessage: "Error creating project"});
    next()
  }
})


/* EDIT PROJECT */


router.get("/projects/:projectid/edit-project", isLoggedIn, (req, res, next) => {
  const {projectid} = req.params;
  const currentUser = req.session.user
  Project.findById(projectid)
  .then((project) => {
    res.render('projects/edit-project', {currentUser, project, projectid} )
  })
  .catch((err) => next(err))
  })


router.post("/projects/:projectid/edit-project", fileUploader.single('profilepicture'), (req, res, next) => {
  const {projectid} = req.params;
  const username = req.session.user.username;
  const {title, description, link} = req.body;
  if(username !== req.session.user.username) {
    return res.redirect("/search")
  } else {
    if(req.file) {
      Project.findByIdAndUpdate( projectid, {description, title, link, image: req.file.path}, {new: true})
      .then(() => res.redirect(`/profile/${username}`))
      .catch(err => next(err))
    } 
    if(!req.file) {
      Project.findByIdAndUpdate( projectid, {description, title, link}, {new: true})
      .then(() => res.redirect(`/profile/${username}`))
      .catch(err => next(err))
    }
}});


/* COMMENTS */


router.post('/:projectid/comments/:username', isLoggedIn, async (req, res, next)=> {
  const {projectid, username} = req.params;
  const user = req.session.user;
  const {comments} = req.body;

  try {
  const createdComment = await Comment.create({project: projectid, author: user._id, comment: comments})   
   await Project.findByIdAndUpdate(projectid, {$push: {comments: createdComment._id}}).populate("author")
   res.redirect(`/${username}/projects`)
  } catch (error) {
    next(error)
  }
})


module.exports = router;