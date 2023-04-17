const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('User', UserSchema)
