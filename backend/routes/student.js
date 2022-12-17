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

router.get("/course-class", async (req, res) => {
    var id = "FD-01";
    var classOfCourse = await query.searchClassbyCourseID(id);
    var result = [];
    classOfCourse.forEach(element => {
        result.push({
            class_id: element.class_id,
            start_date: element.start_date,
            end_date: element.end_date,
            form: element.form,
            branch_id: element.branch_id,
            room: element.room,
            time: element.time,
            teacher_id: element.teacher_id,
            status: element.status,
            numOfStudent: element.numOfStudent
        })
    });
    res.json(result);
  });
 
router.post("register-class", async (req, res) => {
    var sql = "CALL add_student_class(?,?,?)";
    dbconnect.query(sql, [req.user.id, req.body.course_id, req.body.class_id], (err, result) => {
        if(err) {
            res.status(400).send({message: err});
        }
        else {
            res.status(200).send({message: "Register class successfully"});
        }
    });
});
module.exports = router;