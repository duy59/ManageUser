
const mongoose = require('mongoose');
const generate = require('../../helper/generate');

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date
    },
    fullName: {
        type: String
    },
    role_id: {
        type : String
    },
    status: {
        type: String,
    },
    deleted : {
        type: Boolean,
        default: false
    },
    token : {
        type: String,
        default: generate.gererateRandomString(30)
    }
    });

const User = mongoose.model('User', UserSchema);

module.exports = User;