var mysql = require('mysql');
var userModel = {};

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_db'
});

userModel.authenticate = function(user, pass, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user WHERE username = ' +
            connection.escape(user) + ' and password = ' +
            connection.escape(pass);
        connection.query(sql, function(err, rows) {
            if (err)
                throw err;
            else
                callback(null, rows);
        });
    }
};

module.exports = userModel;
