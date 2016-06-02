var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username)
    logged = true;
  else
    logged = false;
  res.render('index', { title: 'Express' , logged : logged});
});

router.get('/login', function(req, res, next) {
    console.log('####################################### get login');
    if (!req.session.username) {
        logged = false;
        res.render('login', {
            title: 'Inicia Sesion'
        });
    } else {
        res.redirect('/users/profile');
    }
});

router.post('/login', function(req, res) {
    console.log('####################################### post login');
    if(!req.session.username)
    {
      if (req.param('username') && req.param('password')) {
          uname = req.param('username');
          upsw = req.param('password');
          userModel.authenticate(uname, upsw, function(error, data) {
              if (typeof data !== 'undefined' && data.length > 0) {
                  console.log('Username: ' + data[0].username + ' uname:' + uname);
                  console.log('Password: ' + data[0].password + ' upsw:' + upsw);
                  req.session.username = uname;
                  res.redirect('/users/profile');
              } else {
                  res.json(404, {
                      'msgError': 'error'
                  });
              }
          });
      } else {
          res.redirect('/login');
      }
    } else {
        res.redirect('/users/profile');
    }
});


module.exports = router;
