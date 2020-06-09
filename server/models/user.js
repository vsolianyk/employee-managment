const mongoose = require('mongoose');
const roles = require('../utils/roles');
const validateEmail = require('../utils/index');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [ validateEmail, 'Invalid email' ]
    },
    role: {
        type: String,
        enum: roles,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;