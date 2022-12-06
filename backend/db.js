var mysql = require('mysql');
require('dotenv').config();

exports.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
<<<<<<< HEAD
    password: "10042002",
=======
    password: "phuocminh22",
>>>>>>> e160bf8fe8f7cdc4c92f440f4acebf0dac3f9bb4
    database : "language_center"
});
  
exports.connection.connect(function(err) {
    if (err) {
      console.log("Error in the connection");
      console.log(err);
    }
    else{
      console.log('Database Connected');
    }
});
