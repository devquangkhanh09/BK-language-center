var express = require('express');
var router = express.Router();
var passport = require('passport');
var {adminStrategy, teacherStrategy, studentStrategy} = require('../auth/strategy');

passport.use('local-admin', adminStrategy);
passport.use('local-teacher', teacherStrategy);
passport.use('local-student', studentStrategy);

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, role: user.role });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.get('/', (req, res) => {
    res.send('<h1>Homepage</h1>');
})

router.get('/signin-admin', (req, res) => {
    res.render('signin', {
        title: 'Sign In Admin',
        action: '/signin-admin'
    })
});

router.get('/signin-teacher', (req, res) => {
    res.render('signin', {
        title: 'Sign In Teacher',
        action: '/signin-teacher'
    })
});

router.get('/signin-student', (req, res) => {
    res.render('signin', {
        title: 'Sign In Student',
        action: '/signin-student'
    })
});

router.post('/signin-admin', passport.authenticate('local-admin', {
    failureMessage: true
}), (req, res) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).send("Unauthorized");
    } else return res.status(200).send(req.user);
});

router.post('/signin-student', passport.authenticate('local-student', {
    failureMessage: true
}), (req, res) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).send("Unauthorized");
    } else return res.status(200).send({
        role: req.user.role,
        id: req.user.id,
        name: req.user.full_name
    });
});

router.post('/signin-teacher', passport.authenticate('local-teacher', {
    failureMessage: true
}), (req, res) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).send("Unauthorized");
    } else return res.status(200).send({
        role: req.user.role,
        id: req.user.id,
        name: req.user.full_name
    });
});

router.post('/signout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.status(200).send("Sign out successfully");
    });
});

module.exports = router;