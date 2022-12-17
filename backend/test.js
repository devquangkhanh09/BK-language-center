var mysql = require('mysql');
require('dotenv').config();

dbconnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "phuocminh22",
    database : "language_center"
});

dbconnect.connect(function(err) {
    if (err) {
      console.log("Error in the connection");
      console.log(err);
    }
    else{
      doIt("TC-010355");
    }
});

async function teacherInfo (teacher_id) {
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

async function doIt(id){
  var classOfCourse = await teacherInfo(id);
  console.log(classOfCourse.full_name);
  /*  classOfCourse.forEach(element => {
        console.log(element.class_id, element.start_date);
  });*/
}