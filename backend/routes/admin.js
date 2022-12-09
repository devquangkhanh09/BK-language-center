var express = require("express");
var router = express.Router();
var { authorize } = require("../auth/auth");
var dbconnect = require("../db").connection;
var query = require("../query");

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
  stat.course = await query.getStatistics("course");
  stat.class = await query.getStatistics("class");
  stat.student = await query.getStatistics("student");
  stat.teacher = await query.getStatistics("teacher");
  dashboard_data.stat = stat;
  //-----COURSE INFO ------------------
  dashboard_data.courses = await query.get_all_courses();

  //----CLASS INFO ---------------------
  dashboard_data.class = await query.get_all_class();
  res.json(dashboard_data);
});

router.get("/curriculums", async (req, res) => {
  var all_curriculum = await query.get_all_curriculums();
  res.json(all_curriculum);
});

router.get("/teachers", async (req, res) => {
  var all_teacher = await query.get_all_teacher();
  res.json(all_teacher);
});

router.get("/students", async (req, res) => {
  var all_student = await query.get_all_student();
  res.json(all_student);
});

router.get("/handle-register", async (req, res) => {
  var unpaid_register = await query.get_unpaid();
  res.json({ registers: unpaid_register });
});

router.get("/class", async (req, res) => {
  var all_class = await query.get_all_class();
  res.json(all_class);
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
      if (err) res.status(400).json({message: err.message});
      else
        res.status(200).json({
          message:
            "Cập nhật trạng thái thanh toán cho yêu cầu đăng ký thành công",
        });
    }
  );
});

router.post("/course-create", async (req, res) => {
  var num = 0;
  var course_id = req.body.id;
  
  try {
    await query.createCourse(req.body);
    var cur = req.body.curriculum;
    cur.forEach(async (element) => {
      num++;
      await query.createCourseCur({id: course_id, ...element});
    });

    await query.updateNumCur(course_id, num);
    return res.status(201).json({message: "Thêm khoá học thành công"});
  } catch (err) {
    return res.status(400).json({message: err.message});
  }
});

router.post("/course-edit", async (req, res) => {
  await query.updateCourse(
    req.body.id,
    req.body.name,
    req.body.type,
    req.body.requirement,
    req.body.target,
    req.body.cost
  );
  var course_id = req.body.id;
  var cur = req.body.curriculum;
  var num = 0;
  await query.deleteCur(course_id);
  cur.forEach(async function (element) {
    ++num;
    await query.updateCourseCur(course_id, element.lecture, element.description);
  });
  await query.updateNumCur(course_id, num);
  res.send({ message: "Course edit successfully" });
});

router.post("/class-create", async (req, res) => {
  var course_sql =
    "INSERT INTO class(course_id,class_id,start_date,end_date,form,branch_id,room,time,teacher_id,status,numOfStudent) VALUES('" +
    req.body.course_id +
    "','" +
    req.body.class_id +
    "','" +
    req.body.start_date +
    "','" +
    req.body.end_date +
    "','" +
    req.body.form +
    "','" +
    req.body.branch_id +
    "','" +
    req.body.room +
    "','" +
    req.body.time +
    "','" +
    req.body.teacher_id +
    "','" +
    req.body.status +
    "','" +
    0 +
    "')";
  dbconnect.query(course_sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400);
    }
  });
  res.send("Course edit successfully");
});

router.post("/class-edit", async (req, res) => {
  var class_sql =
    "UPDATE class SET " +
    "start_date = '" +
    req.body.start_date +
    "'," +
    "end_date = '" +
    req.body.end_date +
    "'," +
    "form = '" +
    req.body.form +
    "'," +
    "branch_id = '" +
    req.body.branch_id +
    "'," +
    "room = '" +
    req.body.room +
    "'," +
    "time = '" +
    req.body.time +
    "'," +
    "teacher_id = '" +
    req.body.teacher_id +
    "' WHERE course_id = '" +
    req.body.course_id +
    "' AND class_id = '" +
    req.body.class_id +
    "'";
  dbconnect.query(class_sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400);
    }
  });
  res.send("Class edit successfully");
});

router.post("/class-delete", async (req, res) => {
  var class_sql =
    "CALL delete_class" +
    "('" +
    req.body.course_id +
    "','" +
    req.body.class_id +
    "')";
  dbconnect.query(class_sql, (err, result) => {
    if (err) {
      res.status(400);
      console.log(err);
    }
  });
  res.send("Class deleted successfully");
});

router.delete("/course-delete", async (req, res) => {
  var course_sql = "CALL delete_course(?)";
  dbconnect.query(course_sql, [req.query.course_id], (err, result) => {
    if (err) {
      return res.status(400).json({message: err.message});
    } else {
      return res.status(200).json({message: "Xoá khoá học thành công"});
    }
  });
});

module.exports = router;
