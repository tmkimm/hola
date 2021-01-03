const mongoose = require('mongoose');

const studySchema = mongoose.Schema({
    topic       : String,
    language    : [String],
    location    : String,
    position    : [{ part: String,
                     personnel: Number}
                ],
    title       : String,
    content     : String
});

const Study = mongoose.model('Study', studySchema);

module.exports = { Study };