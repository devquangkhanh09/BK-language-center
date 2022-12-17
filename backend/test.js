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
      doIt("FD-02");
    }
});

function searchClassbyCourseID (course_id) {
  return new Promise((resolve, reject) => {
    var class_query =
      "SELECT * FROM class WHERE course_id = ?";
      console.log(class_query);
    dbconnect.query(class_query, [course_id], (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

async function doIt(id){
  var classOfCourse = await searchClassbyCourseID(id);
  //console.log(classOfCourse);
    classOfCourse.forEach(element => {
        console.log(element.class_id, element.start_date);
  });
}


console.log(1);