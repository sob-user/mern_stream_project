const mongoose = require('mongoose');
const Schema = mongoose.Schema

const itemSchema = new Schema({
    title: {
        type: String,
        required : 'title is required'
    },
    author: {
        type: String,
        required: 'author name is required'
    },
    parution_date: {
        type: Number,
        required: 'parution date is required'
    },
    style: [{
        type: String,
        required: 'music style is required'
    }],
    audio: [],
    image: [],
    creation_date: {
        type: Date,
        default: Date.now
    }
});

const itemModel = mongoose.model('musical works', itemSchema)

module.exports = itemModel