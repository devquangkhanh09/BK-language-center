var passport = require('passport');
var LocalStrategy = require('passport-local');
var {authenticateAdmin, authenticateTeacher, authenticateStudent} = require('./auth');

const adminStrategy = new LocalStrategy(async function verify(username, password, cb) {
    try {
        const user = await authenticateAdmin(username, password);
        if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
        else return cb(null, user);
    } catch (error) {
        cb(error);
    }   
});

const teacherStrategy = new LocalStrategy(async function verify(username, password, cb) {
    try {
        const user = await authenticateTeacher(username, password);
        if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
        else return cb(null, user);
    } catch (error) {
        cb(error);
    }   
});

const studentStrategy = new LocalStrategy(async function verify(username, password, cb) {
    try {
        const user = await authenticateStudent(username, password);
        if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
        else return cb(null, user);
    } catch (error) {
        cb(error);
    }   
});

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, { id: user.id, role: user.role });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

module.exports = {adminStrategy, teacherStrategy, studentStrategy}