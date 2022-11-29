var mysql = require('mysql');
require('dotenv').config();

exports.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
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
