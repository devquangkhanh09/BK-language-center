var express = require('express');
var router = express.Router();
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var {authorize} = require('../auth/auth');

var ensureLoggedIn = ensureLogIn('/signin-student');

router.use(ensureLoggedIn);
router.use(authorize('STUDENT'));

// TO-DO: fix path (maybe?), create handlers for student path
router.get('/', (req, res) => {
    res.render('page', {
        title: "Student Page"
    });
})

module.exports = router;