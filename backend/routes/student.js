var express = require('express');
var router = express.Router();
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var {authorize} = require('../auth/auth');
var query = require("../query");
var dbconnect = require("../db").connection;

var ensureLoggedIn = ensureLogIn('/signin-student');

router.use(ensureLoggedIn);
router.use(authorize('student'));

// TO-DO: fix path (maybe?), create handlers for student path 
router.get("/courses", async (req, res) => {
  var all_courses = await query.get_all_courses();
  var result = [];
    all_courses.forEach(course => {
        result.push({
            course_id: course.course_id,
            name: course.name,
            cost: course.cost,
            requirement: course.requirement,
            type: course.type,
            target: course.target
        });
    });
  res.json(result);
});

router.get("/course-info", async (req, res) => {
    var course_id = req.query.course_id;
    var course_data = await query.getCourse(course_id);
    var result = {};
    result.name = course_data.name;
    result.numOfLecture = course_data.numOfLecture;
    result.type = course_data.type;
    result.requirement = course_data.requirement;
    result.target = course_data.target;
    result.cost = course_data.cost;
    result.numOfClass = (await query.countCourseClass(course_id))[0].num;
    var all_curriculum = await query.get_all_curriculums();
    result.lecture = [];
    all_curriculum.forEach(cur => {
          result.lecture.push({
              lecture: cur.lecture,
              description: cur.description
          });
      })
    res.json(result);
  });

router.get("/curriculums", async (req, res) => {
  var all_curriculum = await query.get_all_curriculums();
  res.json(all_curriculum);
});

router.get("/classes/:id", async (req, res) => {
    var id = req.params.id;
    var classOfCourse = await query.searchClassbyCourseID(id);
    var result = [];
    for (var idx = 0; idx < classOfCourse.length; idx++) {
        var element = classOfCourse[idx];
        var schedule = element.time;
        var sched = ""; 
        if (schedule === 1){
            sched = "Thứ 2, 4, 6: 17h30 - 19:00";
        }
        else if (schedule === 2){
            sched = "Thứ 2, 4, 6: 19h30 - 21:00";
        }
        else if (schedule === 3){
            sched = "Thứ 3, 5, 7: 17h30 - 19:00";
        }
        else if (schedule === 4){
            sched = "Thứ 3, 5, 7: 19h30 - 21:00";
        }

        var std_status;
        var checkStdClass = await query.checkStudentInClass(req.user.id, element.class_id, id);
        if (checkStdClass.length === 0) {
            if (element.numOfStudent === element.maxStudent) std_status = 1;
            else if (element.start_date.toISOString().split('T')[0] <= (new Date()).toISOString().split('T')[0]) std_status = 4;
            else std_status = 0;
        }
        else {
            if (checkStdClass[0].status === "paid") std_status = 3;
            else std_status = 2;
        }
        
        var ele = {
            class_id: element.class_id,
            start_date: element.start_date.toISOString().slice(0,10),
            end_date: element.end_date.toISOString().slice(0,10),
            form: element.form,
            branch_id: element.branch_id,
            room: element.room,
            time: sched,
            teacher_name: (await query.teacherInfo(element.teacher_id)).full_name,
            numOfStudent: element.numOfStudent,
            maxStudent: element.maxStudent,
            studentStatus: std_status,
        }
        result.push(ele);
    };
    res.json(result);
});

router.post("/register-class", async (req, res) => {
    var sql = "CALL add_student_class(?,?,?)";
    dbconnect.query(sql, [req.body.course_id, req.body.class_id, req.user.id], (err, result) => {
        if(err) {
            res.status(400).send({message: err.message});
        }
        else {
            res.status(200).send({message: "Register class successfully"});
        }
    });
});
module.exports = router;