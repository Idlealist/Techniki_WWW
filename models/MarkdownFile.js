const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MarkdownFile = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    html: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('MarkdownFile', MarkdownFile)