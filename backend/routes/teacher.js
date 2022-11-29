var express = require('express');
var router = express.Router();
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var {authorize} = require('../auth/auth');

var ensureLoggedIn = ensureLogIn('/signin-teacher');

router.use(ensureLoggedIn);
router.use(authorize('TEACHER'));

// TO-DO: fix path (maybe?), create handlers for teacher path
router.get('/', (req, res) => {
    res.render('page', {
        title: "Teacher Page"
    });
})

module.exports = router;