import mongoose from 'mongoose';

const studySchema = mongoose.Schema({
    topic       : String,
    language    : [String],
    location    : String,
    position    : [{ part: String,
                    personnel: Number}
                    ],
    title       : String,
    content     : String,
    views       : { type: Number, default: 0 }
},
{
    timestamps: true,
    versionKey: false
});

const Study = mongoose.model('Study', studySchema);

export { Study };