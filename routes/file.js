const express = require('express');
const router = express.Router();
const MarkdownFile = require('../models/MarkdownFile');
const isAuthenticated = require('../Middlewares/authMiddleware')

router.get('/', isAuthenticated, async (req, res) => {
    const userFiles = await MarkdownFile.find({ owner: req.user._id });
    res.render('files/files', { username: req.user.username, userFiles: userFiles});
});

router.post('/', isAuthenticated, async (req, res) =>{
    const newFile = await MarkdownFile.create({
        title: req.body.title,
        content: '',
        html: '',
        owner: req.user.id
    })
    res.redirect(`/user/${req.user.username}/files`);
});

router.get('/:id', isAuthenticated, async(req, res) =>{
    res.json(await MarkdownFile.findById(req.params.id))
});
router.put('/:id', isAuthenticated, async (req, res) =>{
    res.json(await MarkdownFile.findById(req.params.id))
});

module.exports = router;