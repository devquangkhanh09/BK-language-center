var express = require("express");
var router = express.Router();
var dbconnect = require("../db").connection;
var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
var { authorize } = require("../auth/auth");
var query = require("../query");

var ensureLoggedIn = ensureLogIn("/signin-teacher");

router.use(ensureLoggedIn);
router.use(authorize("teacher"));

// TO-DO: fix path (maybe?), create handlers for teacher path
router.get("/classes", async (req, res) => {
  var id = req.params.id;
  var teacherClass = await query.get_all_class();
  var result = [];
  for (var idx = 0; idx < teacherClass.length; idx++) {
    var element = teacherClass[idx];
    var schedule = element.time;
    var sched = "";
    if (schedule === 1) {
      sched = "Thứ 2, 4, 6: 17h30 - 19:00";
    } else if (schedule === 2) {
      sched = "Thứ 2, 4, 6: 19h30 - 21:00";
    } else if (schedule === 3) {
      sched = "Thứ 3, 5, 7: 17h30 - 19:00";
    } else if (schedule === 4) {
      sched = "Thứ 3, 5, 7: 19h30 - 21:00";
    }

    var std_status;
    var checkStdClass = await query.checkStudentInClass(
      req.user.id,
      element.class_id,
      id
    );
    if (checkStdClass.length === 0) {
      if (element.numOfStudent === element.maxStudent) std_status = 1;
      else std_status = 0;
    } else {
      if (checkStdClass[0].status === "paid") std_status = 3;
      else std_status = 2;
    }

    var ele = {
      course_id: element.course_id,
      class_id: element.class_id,
      start_date: element.start_date.toISOString().slice(0, 10),
      end_date: element.end_date.toISOString().slice(0, 10),
      form: element.form,
      branch_id: element.branch_id,
      room: element.room,
      time: sched,
      teacher_name: (await query.teacherInfo(element.teacher_id)).full_name,
      numOfStudent: element.numOfStudent,
      maxStudent: element.maxStudent,
      studentStatus: std_status,
    };
    result.push(ele);
  }
  res.json(result);
});

router.get("/student-class", async (req, res) => {
  var all_student_class = await query.get_all_student_class();
  res.json(all_student_class);
});

router.put("/enter-grade", async (req, res) => {
  try {
    var updateList = req.body;
    for (var i = 0; i < updateList.length; i++) {
      await query.enterGrade(updateList[i]);
    }
    return res.status(200).json({ message: "Nhập điểm thành công" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
