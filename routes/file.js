const express = require('express');
const router = express.Router();
const MarkdownFile = require('../models/MarkdownFile');
const isAuthenticated = require('../Middlewares/authMiddleware');
const {marked} = require('marked');
const fs = require('fs');
const {promisify} = require("util");
const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

router.get('/', isAuthenticated, async (req, res) => {
    const userFiles = await MarkdownFile.find({owner: req.user._id}).sort({updatedAt: -1});
    res.render('files/files', {username: req.user.username, userFiles: userFiles});
});

router.post('/', isAuthenticated, async (req, res) => {
    const newFile = await MarkdownFile.create({
        title: req.body.title,
        content: '',
        html: '',
        owner: req.user.id
    })
    res.redirect(`/files/${newFile._id}`);
});

router.get('/:id', isAuthenticated, async (req, res) => {
    res.render('files/editor', {username: req.user.username, MarkdownFile: await MarkdownFile.findById(req.params.id)})
});
router.post('/:id', isAuthenticated, async (req, res) => {
    const {markdownContent} = req.body
    const html = marked(markdownContent);
    await MarkdownFile.findByIdAndUpdate(req.params.id, {content: markdownContent, html: html});
    const updated = await MarkdownFile.findById(req.params.id);
    res.json({success: true, html: updated.html});
});

router.put('/:id/title', isAuthenticated, async (req, res) => {
    const {title} = req.body;
    const markdownFile = await MarkdownFile.findById(req.params.id);
    markdownFile.title = title;
    await markdownFile.save();
    res.redirect(`/files/${req.params.id}`);
});
router.delete('/:id', isAuthenticated, async (req, res) => {
    await MarkdownFile.findByIdAndDelete(req.params.id);
    res.redirect(`/files`);
});
router.get('/:id/export', async (req, res) => {
    try {
        const markdownFile = await MarkdownFile.findById(req.params.id);
        const tempPath = `temp_${markdownFile.title}.html`;
        await writeFileAsync(tempPath, markdownFile.html);

        res.download(tempPath, () => {
            unlinkAsync(tempPath).catch(err => {
                console.error(err);
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
module.exports = router;
