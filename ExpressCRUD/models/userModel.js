var mysql = require('mysql');
var userModel = {};

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_db'
});

// Method Get
userModel.getUser = function(id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM user WHERE id = ' + connection.escape(id);
        connection.query(sql, function(err, rows) {
            if (err)
                throw err;
            else
                callback(null, rows);
        });
    }
};

// Method Get/:ID
userModel.getUsers = function(callback) {
    if (connection) {
        var sql = 'SELECT * FROM user';
        connection.query(sql, function(err, rows) {
            if (err) {
                throw err;
            }
            if (callback) {
                callback(null, rows);
            }
        });
    }
};

// Method Post
userModel.createUser = function(username, password, callback) {
    if (connection) {
        var sql = 'insert into user (username, password, createAt) values (' + connection.escape(username) +
            ',' + connection.escape(password) + ', now() )';
        connection.query(sql, function(err, row) {
            if (err) {
                throw err;
            }
            if (callback) {
                callback(null, true);
            }
        });
    }
};

// Method Delete
userModel.deleteUser = function(id, callback) {
    if (connection) {
        var sql = 'delete from user where id = ' + connection.escape(id);
        connection.query(sql, function(err, row) {
            if (err) {
                throw err;
            }
            if (callback) {
                callback(null, true);
            }
        });
    }
};

// Method PUT
userModel.updateUser = function(id, user, pass, callback) {
    if (connection) {
        var sql = 'UPDATE user SET username = ' + connection.escape(user) + ', password = ' + connection.escape(pass) + ' where id = ' + connection.escape(id);
        connection.query(sql, function(err, row) {
            if (err) {
                throw err;
            }
            if (callback) {
                callback(null, true);
            }
        });
    }
}

module.exports = userModel;
