var dbconnect = require('./db').connection;

exports.getStatistics = async function(field) {
    var query = "SELECT COUNT(*) AS COUNT FROM ??";
    return new Promise((resolve, reject) => {
        dbconnect.query(query, [field], (err, result, fields) =>{
            if (err){
                reject(err);
            }
            else {
                resolve(parseInt(result[0].COUNT));
            }
        })
    })
}

exports.get_all_courses = async function() {
    return new Promise((resolve, reject) => {
        course_query = "SELECT * FROM course";
        dbconnect.query(course_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

exports.get_all_class = async function() {
    return new Promise((resolve, reject) => {
        class_query = "SELECT * FROM class";
        dbconnect.query(class_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

exports.get_all_teacher = async function() {
    return new Promise((resolve, reject) => {
        class_query = "SELECT * FROM teacher";
        dbconnect.query(class_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

exports.get_all_student = async function() {
    return new Promise((resolve, reject) => {
        class_query = "SELECT * FROM student";
        dbconnect.query(class_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

exports.get_unpaid = async function() {
    return new Promise((resolve, reject) => {
        class_query = 'SELECT * FROM student_class WHERE status = "unpaid"';
        dbconnect.query(class_query, (err, result, fields) =>{
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

exports.searchClassbyCourse = async function(course_name) {
    return new Promise((resolve, reject) => {
        var class_query = 'SELECT * FROM class WHERE course_name = ' + course_name + '"';
        dbconnect.query(class_query, (err, result, fields) =>{
            if (err){
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}
