var express = require('express');
var router = express.Router();
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var {authorize} = require('../auth/auth');
var query = require("../query");

var ensureLoggedIn = ensureLogIn('/signin-student');

router.use(ensureLoggedIn);
router.use(authorize('student'));

// TO-DO: fix path (maybe?), create handlers for student path
router.get("/courses", async (req, res) => {
  var all_courses = await query.get_all_courses();
  res.json(all_courses);
});

router.get("/curriculums", async (req, res) => {
  var all_curriculum = await query.get_all_curriculums();
  res.json(all_curriculum);
});
 

module.exports = router;