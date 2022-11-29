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

function getStatistics(field){
    query = "SELECT COUNT(*) FROM " + field;
    return new Promise((reject, resolve) => {
        dbconnect.connect((err) => {
            if (err) reject(err);
        })
        dbconnect.query(query, (err, result, fields) =>{
            if (err){
                console.log("err");
                reject(err);
            }
            else {
                resolve(resolve);
                //console.log(result);
                //console.log(fields);
            }
        })
    })
}

a = getStatistics("course");
console.log("a: ", a);