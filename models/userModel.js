const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: 'username is required'
    },
    email: {
        type: String,
        required: 'email field is required'
    },
    password: {
        type: String,
        required: 'password field is required'
    },
    verify: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    inscription_date: {
        type: Date,
        default: Date.now
    },
    favorite_list: [{
        type: Schema.Types.ObjectId,
        ref: 'musical works'
    }]
});

const userModel = mongoose.model('users', userSchema)

module.exports = userModel