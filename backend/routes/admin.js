var express = require("express");
var router = express.Router();
var { authorize } = require("../auth/auth");
var dbconnect = require("../db").connection;
var {
  getStatistics,
  get_all_class,
  get_all_courses,
  get_all_student,
  get_all_teacher,
  get_unpaid,
  searchClassbyCourse,
  studentInClass,
} = require("../query");

const ensureLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

router.use(ensureLoggedIn);
router.use(authorize("ADMIN"));

// TO-DO: query from MySQL and render dashboard page

// --------------------------------------------------------------

router.get("/courses", async (req, res) => {
  //-------STATISTICS
  var dashboard_data = {};
  var stat = {};
  stat.course = await getStatistics("course");
  stat.class = await getStatistics("class");
  stat.student = await getStatistics("student");
  stat.teacher = await getStatistics("teacher");
  dashboard_data.stat = stat;
  //-----COURSE INFO ------------------
  dashboard_data.courses = await get_all_courses();

  //----CLASS INFO ---------------------
  dashboard_data.class = await get_all_class();
  res.json(dashboard_data);
});

router.get("/teachers", async (req, res) => {
  var all_teacher = await get_all_teacher();
  res.json(all_teacher);
});

router.get("/students", async (req, res) => {
  var all_student = await get_all_student();
  res.json(all_student);
});

router.get("/handle-register", async (req, res) => {
  var unpaid_register = await get_unpaid();
  res.json({ registers: unpaid_register });
});

router.put("/handle-register", async (req, res) => {
  const query = "CALL update_status(?, ?, ?, ?)";
  dbconnect.query(
    query,
    [
      req.body.course_id,
      req.body.class_id,
      req.body.student_id,
      req.body.status,
    ],
    (err) => {
      if (err) res.status(400).json({ message: err.message });
      else
        res.status(200).json({
          message:
            "Cập nhật trạng thái thanh toán cho yêu cầu đăng ký thành công",
        });
    }
  );
});

router.get("/class", async (req, res) => {
  var data;
  if (req.query.course_id === "") data = await get_all_class();
  else data = await searchClassbyCourse(req.query.course_id);
  res.json(data);
});

router.post("/course-create", async (req, res) => {
  var course_sql =
    "INSERT INTO `course` (`course_id`,`name`,`type`,`requirement`,`target`,`cost`) VALUES (?,?,?,?,?,?)";
  var cur_sql =
    "INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES (?,?,?)";
  var num = 0;
  var course_id = req.body.id;
  dbconnect.query(
    course_sql,
    [
      req.body.id,
      req.body.name,
      req.body.type,
      parseFloat(req.body.requirement),
      parseFloat(req.body.target),
      parseFloat(req.body.cost),
    ],
    (err, result) => {
      if (err) {
        res.status(400);
      }
    }
  );
  console.log(course_id);
  var cur = req.body.curriculum;
  cur.forEach((element) => {
    num++;
    dbconnect.query(
      cur_sql,
      [course_id, element.lecture, element.description],
      (err, result) => {
        if (err) {
          res.status(400);
        }
      }
    );
  });
  var upnum = "UPDATE course SET numOfLecture = ? WHERE course_id = ?";
  dbconnect.query(upnum, [num, course_id], (err, result) => {
    if (err) {
      res.status(400);
    }
  });
  res.send("Course added successfully");
});

router.post("/course-edit", async (req, res) => {
  var course_sql = "CALL updateCourse (?,?,?,?,?,?,?)";
  var cur_sql =
    "UPDATE course-curriculum SET description = ? WHERE course_id = ? AND lecture = ?";
  var course_id = req.body.id;
  dbconnect.query(
    course_sql,
    [
      req.body.id,
      req.body.name,
      req.body.type,
      req.body.requirement,
      req.body.target,
      req.body.cost,
      req.body.numOfLecture,
    ],
    (err, result) => {
      if (err) {
        res.status(400);
      }
    }
  );
  var cur = req.body.curriculum;
  cur.forEach((element) => {
    dbconnect.query(
      cur_sql,
      [element.description, course_id, element.lecture],
      (err, result) => {
        if (err) {
          res.status(400);
        }
      }
    );
  });
  res.send("Course edit successfully");
});

router.post("/class-create", async (req, res) => {
  var course_sql =
    "INSERT INTO `class` (`course_id`,`class_id`,`start_date`,`end_date`,`form`,`branch_id`,`room`,`time`,`teacher_id`,`status`,`numOfStudent`) VALUES (?,?,?,?,?,?,?,?,?)";
  dbconnect.query(
    course_sql,
    [
      req.body.course_id,
      req.body.class_id,
      req.body.start_date,
      req.body.end_date,
      req.body.form,
      req.body.branch_id,
      req.body.room,
      req.body.time,
      req.body.teacher_id,
      "future",
      0,
    ],
    (err, result) => {
      if (err) {
        res.status(400);
      }
    }
  );
  res.send("Course edit successfully");
});

router.post("/class-create", async (req, res) => {
  var course_sql =
    "INSERT INTO `class` (`course_id`,`class_id`,`start_date`,`end_date`,`form`,`branch_id`,`room`,`time`,`teacher_id`,`status`,`numOfStudent`) VALUES (?,?,?,?,?,?,?,?,?)";
  dbconnect.query(
    course_sql,
    [
      req.body.course_id,
      req.body.class_id,
      req.body.start_date,
      req.body.end_date,
      req.body.form,
      req.body.branch_id,
      req.body.room,
      req.body.time,
      req.body.teacher_id,
      "future",
      0,
    ],
    (err, result) => {
      if (err) {
        res.status(400);
      }
    }
  );
  res.send("Course added successfully");
});

router.get("/class-delete", async (req, res) => {
  var class_sql = "CALL delete_class(?, ?)";
  dbconnect.query(
    class_sql,
    [req.body.course_id, req.body.class_id],
    (err, result) => {
      if (err) {
        res.status(400);
      }
    }
  );
  res.send("Class deleted successfully");
});

router.get("/course-delete", async (req, res) => {
  var course_sql = "CALL delete_course(?)";
  dbconnect.query(course_sql, [req.body.course_id], (err, result) => {
    if (err) {
      res.status(400);
    }
  });
  res.send("Course deleted successfully");
});

module.exports = router;
