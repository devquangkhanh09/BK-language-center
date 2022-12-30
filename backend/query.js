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

exports.get_all_student_class = async function () {
  return new Promise((resolve, reject) => {
    student_class_query = "SELECT * FROM student_class";
    dbconnect.query(student_class_query, (err, result, fields) => {
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
    teacher_query = "SELECT * FROM teacher";
    dbconnect.query(teacher_query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.get_all_branches = async function () {
  return new Promise((resolve, reject) => {
    branch_query = "SELECT * FROM branch";
    dbconnect.query(branch_query, (err, result, fields) => {
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
  cost,
  teacher_requirement
}) {
  return new Promise((resolve, reject) => {
    var course_sql =
      "INSERT INTO `course` (`course_id`,`name`,`type`,`requirement`,`target`,`cost`,`teacher_requirement`) VALUES (?,?,?,?,?,?,?)";
    dbconnect.query(
      course_sql,
      [id, name, type, requirement, target, cost, teacher_requirement],
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
  teacher_requirement,
  numOfLecture
}) {
  return new Promise((resolve, reject) => {
    var course_sql = "CALL updateCourse (?,?,?,?,?,?,?,?)";
    dbconnect.query(
      course_sql,
      [id, name, type, requirement, target, cost, teacher_requirement, numOfLecture],
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
      "SELECT (id,ssn,full_name,phone_number,email,address,level_overall,level_listening,level_reading,level_writing,level_speaking) FROM user INNER JOIN student ON user.id = student.id WHERE user.id = ?";
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
      "SELECT * FROM user INNER JOIN teacher ON user.id = teacher.id WHERE user.id = ?";
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

exports.searchClassbyCourseID = async function (course_id) {
  return new Promise((resolve, reject) => {
    var class_query =
      "SELECT * FROM class WHERE course_id = ?";
    dbconnect.query(class_query, [course_id], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.countCourseClass = async function countCourseClass(course_id) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT COUNT(*) AS num FROM class WHERE course_id = ?";
    dbconnect.query(sql, [course_id], (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    }); 
  });
};

exports.checkStudentInClass = async function checkStudentInClass(student_id, class_id, course_id){
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM student_class WHERE student_id = ? AND class_id = ? AND course_id = ?";
    dbconnect.query(sql, [student_id, class_id, course_id], (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });
  });
}

exports.enterGrade = async ({
  course_id, 
  class_id,
  student_id,
  grade_listening,
  grade_reading,
  grade_writing,
  grade_speaking
}) => {
  return new Promise((resolve, reject) => {
    var sql = `
      UPDATE student_class 
      SET grade_overall=calculate_overall(?,?,?,?), grade_listening=?, grade_reading=?, grade_writing=?, grade_speaking=? 
      WHERE course_id=? AND class_id=? AND student_id=?`;
    dbconnect.query(sql, [
      grade_listening,
      grade_reading,
      grade_writing,
      grade_speaking,
      grade_listening,
      grade_reading,
      grade_writing,
      grade_speaking,
      course_id, 
      class_id,
      student_id,
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    }); 
  });
}

