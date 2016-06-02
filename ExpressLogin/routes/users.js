var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');

/* GET users listing. */

router.get('/profile', function(req, res) {
    console.log('####################################### get profile');
    if (req.session.username) {
        logged = true;
        res.render('layout', {title: 'Profile', logged : logged});
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', function(req, res) {
    console.log('####################################### get logout');
    if (req.session.username) {
        req.session.destroy();
    }
    res.redirect('/login');
});

module.exports = router;
