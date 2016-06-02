var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* CRUD */

// READ
router.get('/list', function(req, res) {
    console.log('####################################### get list');
    if (!req.params.id) {
        userModel.getUsers(function(error, data) {
            if (error)
                throw error;
            else {
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.send(data);
                }
            }
        });
    }
});

router.get('/list/:id', function(req, res) {
    console.log('####################################### get list/:id');
    if (req.params.id) {
        userModel.getUser(req.params.id, function(error, data) {
            if (typeof data !== 'undefined' && data.length > 0)
                res.json(200, data);
            else
                res.json(404, {
                    'msgError': 'error'
                });
        });
    } else
        res.json(404, {
            'msgError': 'error'
        });
});

// CREATE
router.post('/register', function(req, res) {
    console.log('####################################### post register');
    if (req.param('username') && req.param('password')) {
        var uname = req.param('username');
        var upsw = req.param('password');
        userModel.createUser(uname, upsw, function(error) {
            if (error) {
                console.log('Error: ') + error;
                res.send('Error: '+error);
            }
            else {
                console.log('Save user');
                res.send('Save User');
            }
        });
    }
});

// DELETE
router.delete('/delete/:id', function(req, res) {
    console.log('####################################### get delete');
    if (req.params.id) {
        userModel.deleteUser(req.params.id, function(error) {
            if (error){
              console.log('Error: ') + error;
              res.send('Error:'+error);
            } else {
                console.log('Delete user');
                res.send('Delete User');
            }
        });
    }
});

// PUT
router.put('/update/:id', function(req, res) {
    console.log('####################################### get update');
    if (req.params.id && req.param('username') && req.param('password')) {
        var uname = req.param('username');
        var upsw = req.param('password');
        var id = req.params.id;
        userModel.updateUser(id, uname, upsw, function(error) {
            if (error){
              console.log('Error: ') + error;
              res.send('Error:'+error);
            } else {
                console.log('Update user');
                res.send('Update User');
            }
        });
    }else {
      res.send('Error');
    }
});

module.exports = router;
