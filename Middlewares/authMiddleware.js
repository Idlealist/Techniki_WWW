function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.params.username && req.params.username !== req.user.username) {
            return res.status(403).send('Access denied');
        }
        return next();
    }
    res.redirect('/login');
}

module.exports = isAuthenticated;