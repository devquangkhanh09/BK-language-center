var connection = require('../db').connection;

async function authenticateAdmin(username, password) {
    if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) return {id: "admin", role: "ADMIN"};
    else return null; 
}

async function authenticateTeacher(username, password) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM user NATURAL JOIN teacher WHERE username=? AND password=?`;
        connection.query(query, [username, password], (err, result) => {
            if (err) reject(err);
            else if (result.length == 0) resolve(null);
            else resolve({
                role: "TEACHER",
                ...result[0]
            }); 
        })
    });
}

async function authenticateStudent(username, password) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM user NATURAL JOIN student WHERE username=? AND password=?`;
        connection.query(query, [username, password], (err, result) => {
            if (err) reject(err);
            else if (result.length == 0) resolve(null);
            else resolve({
                role: "STUDENT",
                ...result[0]
            }); 
        })
    });
}

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // authentication and authorization successful
        next();
    }
}

module.exports = {authenticateAdmin, authenticateTeacher, authenticateStudent, authorize}