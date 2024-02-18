const express = require('express');
const router = express.Router();
const isAuthenticated = require('../Middlewares/authMiddleware');

router.get('/', isAuthenticated, (req, res) => {
    res.redirect(`user/${req.user.username}`);
});

router.get('/:username', isAuthenticated, (req, res) => {
    res.render('user/userPage', { username: req.user.username });
});

router.post('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

router.get('/:username', isAuthenticated, (req, res) => {
    res.render('user/userPage', { username: req.user.username });
});


module.exports = router;