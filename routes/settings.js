const express = require('express');
const router = express.Router();
const isAuthenticated = require("../Middlewares/authMiddleware");
const User = require("../models/user");
const MarkdownFile = require("../models/MarkdownFile");
const bcrypt = require('bcryptjs');

router.get('/', isAuthenticated, (req, res) =>{
    res.render('user/settings', {username: req.user.username, errorMessage: null })
})
router.post('/change-name', isAuthenticated, async (req, res) => {
    const newName = req.body.newName;

    if (await User.findOne({ username: newName })) {
        return res.render('user/settings', {username: req.user.username, errorMessage: `${newName} is already taken!` });
    }
    await User.findOneAndUpdate(
        { _id: req.user._id },
        { username: newName }
    );
    res.redirect(`/user/${newName}`);
});

router.post('/delete', isAuthenticated, async (req, res) => {
    await MarkdownFile.deleteMany({ owner: req.user._id });
    await User.findOneAndDelete({ _id: req.user._id });
    req.logout(() => {
        res.redirect('/login');
    });
});

router.post('/change-password', isAuthenticated, async (req, res) => {
    const { newPassword, repeatedPassword } = req.body;
    const user = await User.findById(req.user._id);
    if(!newPassword || !repeatedPassword){
        return res.render('user/settings', {username: req.user.username, errorMessage: `Password can't be empty` });
    }
    if (newPassword !== repeatedPassword) {
        return res.render('user/settings', {username: req.user.username, errorMessage: `Passwords don't match` });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.redirect('/user/' + req.params.username);
});

module.exports = router;