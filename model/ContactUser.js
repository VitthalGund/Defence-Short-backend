const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactUser = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactDate: {
        type: Date,
        default: Date.now
    },
    phoneNo: {
        type: Number
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ContactUser', ContactUser);