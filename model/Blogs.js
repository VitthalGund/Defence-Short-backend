const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User")

const Blog = new Schema({
    title: {
        type: String,
        required: true
    },
    titleIamge: {
        data: Buffer,
        contentType: String
    },
    tags: {
        type: Array,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    files: {
        data: ArrayBuffer,
        contentType: String
    },
    author: {
        type: User,
    }
})
module.exports = { Blog };