const setLocals = (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.username = req.user ? req.user.username : null;
    next();
}

module.exports = setLocals;