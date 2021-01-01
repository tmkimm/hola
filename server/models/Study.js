const mongoose = require('mongoose');

const studySchema = mongoose.Schema({
    topic: [{
        type: String
    }],
    language: [{
        type: String
    }],
    location: {
        type: String
    },
    personnel: {
        type: Number,
        default: 1
    },
    title: {
        type: String
    },
    content: {
        type: String
    }
});

const Study = mongoose.model('Study', studySchema);

module.exports = { Study };