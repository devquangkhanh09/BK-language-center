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
      console.log('Database Connected');
    }
});

var a = 'a';
var b =0;
var course_sql =
  "INSERT INTO course (`course_id`,`name`,`type`,`requirement`,`target`,`cost`,`numOfLecture`) VALUES (?,?,?,?,?,?,10)";
  dbconnect.query(
    course_sql,
    [
      a,
      a,
      a,
      b,
      b,
      b
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );