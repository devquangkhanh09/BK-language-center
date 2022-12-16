var dbconnect = require("./db").connection;

exports.getStatistics = async function (field) {
  var query = "SELECT COUNT(*) AS COUNT FROM ??";
  return new Promise((resolve, reject) => {
    dbconnect.query(query, [field], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(parseInt(result[0].COUNT));
      }
    });
  });
};

exports.get_all_courses = async function () {
  return new Promise((resolve, reject) => {
    course_query = "SELECT * FROM course";
    dbconnect.query(course_query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.get_all_curriculums = async function () {
  return new Promise((resolve, reject) => {
    course_query = "SELECT * FROM course_curriculum";
    dbconnect.query(course_query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


exports.get_all_class = async function () {
  return new Promise((resolve, reject) => {
    class_query = "SELECT * FROM class";
    dbconnect.query(class_query, (err, result, fields) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.get_all_teacher = async function () {
  return new Promise((resolve, reject) => {
    class_query = "SELECT * FROM teacher";
    dbconnect.query(class_query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.get_all_student = async function () {
  return new Promise((resolve, reject) => {
    class_query = "SELECT * FROM student";
    dbconnect.query(class_query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.get_unpaid = async function () {
  return new Promise((resolve, reject) => {
    class_query = `
            SELECT course_id, class_id, student_id, full_name AS student_name, cost, register_date
            FROM (student_class JOIN user ON student_id = id) NATURAL JOIN course
            WHERE status = "unpaid"
        `;
    dbconnect.query(class_query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.searchClassbyCourse = async function (course_name) {
  return new Promise((resolve, reject) => {
    var class_query =
      "SELECT * FROM class WHERE course_name = " + course_name + '"';
    dbconnect.query(class_query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.createCourse = async function ({
  id,
  name,
  type,
  requirement,
  target,
  cost
}) {
  return new Promise((resolve, reject) => {
    var course_sql =
      "INSERT INTO `course` (`course_id`,`name`,`type`,`requirement`,`target`,`cost`) VALUES (?,?,?,?,?,?)";
    dbconnect.query(
      course_sql,
      [id, name, type, requirement, target, cost],
      (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.createCourseCur = async function ({id, lecture, description}) {
  return new Promise((resolve, reject) => {
    var cur_sql =
      "INSERT INTO `course_curriculum` (`course_id`,`lecture`,`description`) VALUES (?,?,?)";
    dbconnect.query(
      cur_sql,
      [id, lecture, description],
      (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.updateCourse = async function ({
  id,
  name,
  type,
  requirement,
  target,
  cost,
  numOfLecture
}) {
  return new Promise((resolve, reject) => {
    var course_sql = "CALL updateCourse (?,?,?,?,?,?,?)";
    dbconnect.query(
      course_sql,
      [id, name, type, requirement, target, cost, numOfLecture],
      (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.updateCourseCur = async function (id, lecture, description) {
  return new Promise((resolve, reject) => {
    var cur_sql =
      "UPDATE course_curriculum SET description = ? WHERE course_id = ? AND lecture = ?";
    dbconnect.query(
      cur_sql,
      [id, lecture, description],
      (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.updateNumCur = async function (id, numCur) {
  return new Promise((resolve, reject) => {
    var cur_sql = "UPDATE course SET numOfLecture = ? WHERE course_id = ?";
    dbconnect.query(cur_sql, [numCur, id], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.deleteCur = async function (id) {
  return new Promise((resolve, reject) => {
    var cur_sql = "DELETE FROM course_curriculum WHERE course_id = ?";
    dbconnect.query(cur_sql, [id], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.studentInClass = async function (course_name, class_name) {
  return new Promise((resolve, reject) => {
    var class_query =
      "SELECT * FROM class WHERE course_name = ?? and class_name = ??";
    dbconnect.query(
      class_query,
      [course_name, class_name],
      (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.studentInfo = async function (student_id) {
  return new Promise((resolve, reject) => {
    var stu_query =
      "SELECT (id,ssn,full_name,phone_number,email,address,level_overall,level_listening,level_reading,level_writing,level_speaking) FROM user INNER JOIN student ON user.id = student.id WHERE user.id = ??";
    dbconnect.query(stu_query, [student_id], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

exports.teacherInfo = async function (teacher_id) {
  return new Promise((resolve, reject) => {
    var tec_query =
      "SELECT (id,ssn,full_name,phone_number,email,address,start_date,exp_year,level_overall,level_listening,level_reading,level_writing,level_speaking,type) FROM user INNER JOIN teacher ON user.id = teacher.id WHERE user.id = ??";
    dbconnect.query(tec_query, [teacher_id], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

exports.getCourse = async (course_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM course WHERE course_id = ?";
    dbconnect.query(query, [course_id], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

exports.getCourseCur = async (course_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM course_curriculum WHERE course_id = ?";
    dbconnect.query(query, [course_id], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.ClassOfStudent = async function ClassOfStudent(student_id){
  return new Promise((resolve, reject) => {
    var query = "SELECT * FROM student_class WHERE student_id = ";
    dbconnect.query(query, [student_id], (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });
  });
}