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
router.use(authorize("admin"));

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

router.get("/branches", async (req, res) => {
  var all_branches = await query.get_all_branches();
  res.json(all_branches);
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
  all_class = all_class.map(_class => {
    if (_class.branch_id === null) _class.branch_id = "";
    if (_class.room === null) _class.room = "";
    return _class;
  })
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
            "C???p nh???t tr???ng th??i thanh to??n cho y??u c???u ????ng k?? th??nh c??ng",
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
    return res.status(201).json({message: "Th??m kho?? h???c th??nh c??ng"});
  } catch (err) {
    return res.status(400).json({message: err.message});
  }
});

router.get("/course/:id", async (req, res) => {
  const course_id = req.params.id;
  try {
    const course = await query.getCourse(course_id);
    const courseCur = await query.getCourseCur(course_id);
    return res.status(200).json({course, courseCur});
  } catch (error) {
    return res.status(400).json({message: err.message});
  }

});

router.put("/course-edit", async (req, res) => {
  try {
    await query.updateCourse(req.body);
    await query.deleteCur(req.body.id);
    const curriculum = req.body.curriculum;
    curriculum.forEach(async (lec) => {
      await query.createCourseCur({id: req.body.id, ...lec});
    });

    return res.status(200).json({message: "Ch???nh s???a kho?? h???c th??nh c??ng"});
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
});

router.post("/class-create", async (req, res) => {
  dbconnect.query("CALL add_class(?,?,?,?,?,?,?,?)", [
    req.body.course_id,
    req.body.class_id,
    req.body.start_date,
    req.body.form,
    req.body.branch_id === ""? null:req.body.branch_id,
    req.body.room === ""? null:req.body.room,
    req.body.time,
    req.body.teacher_id
  ], (err, result) => {
    if (err) {
      res.status(400).json({message: err.message});
    } else {
      res.json({message: "T???o l???p h???c th??nh c??ng"});
    }
  });
});

router.post("/class-edit", async (req, res) => {
  dbconnect.query("CALL update_class(?,?,?,?,?,?,?,?)", [
    req.body.course_id,
    req.body.class_id,
    req.body.start_date,
    req.body.form,
    req.body.branch_id === ""? null:req.body.branch_id,
    req.body.room === ""? null:req.body.room,
    req.body.time,
    req.body.teacher_id
  ], (err, result) => {
    if (err) {
      res.status(400).json({message: err.message});
    } else {
      res.json({message: "Ch???nh s???a l???p h???c th??nh c??ng"});
    }
  });
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
      res.status(400).json({message: err.message});
    } else {
      res.json({message: "T???o l???p h???c th??nh c??ng"});
    }
  });
});

router.delete("/course-delete", async (req, res) => {
  var course_sql = "CALL delete_course(?)";
  dbconnect.query(course_sql, [req.query.course_id], (err, result) => {
    if (err) {
      return res.status(400).json({message: err.message});
    } else {
      return res.status(200).json({message: "Xo?? kho?? h???c th??nh c??ng"});
    }
  });
});

module.exports = router;
