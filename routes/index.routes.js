const router = require("express").Router();
const User = require('../models/User.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/:username/edit-profile", (req, res, next)=> {
res.render('edit-profile')
})

router.post('/:username/edit-profile', (req, res, next) => {
  const {email, password, name, surname} = req.body;

  
})



module.exports = router;
