const express = require('express');
const router = express.Router();

router.get('/user', isAuthenticated, (req, res) => {
    res.render('userPage', { username: req.user.username });
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;