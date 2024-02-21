const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs')

const router = express.Router();

router.get('/login', (req, res) =>{
    res.render('login');
})

router.get('/register', (req, res) =>{
    res.render('register',{message: null, username: null, password: null});
})
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'User not found'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return done(null, false, { message: 'Invalid password'});
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true
}));


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { message: `Username \"${username}\" already exists`, username: username, password: password});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            password: hashedPassword
        });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
    }
});



module.exports = router;
