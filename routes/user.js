const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});
router.post('/auth', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserEmail(email, (err, user) => {
        if (err) console.log(err);
        if (!user) {
            res.json({ success: false, msg: 'User not found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            // OD 13:16
        });
    });
});
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});


module.exports = router;