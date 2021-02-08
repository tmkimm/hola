import mongoose from 'mongoose';
import autoincrement from 'mongoose-auto-increment';

const studySchema = mongoose.Schema({
    topic       : String,
    language    : [String],
    location    : String,
    position    : [{ part: String,
                    personnel: Number}
                    ],
    title       : String,
    content     : String,
    views       : { type: Number, default: 0 },
    sequence       : { type: Number, default: 0 }
},
{
    timestamps: true,
    versionKey: false
});

autoincrement.initialize(mongoose.connection);

studySchema.plugin(autoincrement.plugin, {
    model: 'Study',
    field: 'sequence',
    startAt: 1,
    increment: 1
});

const Study = mongoose.model('Study', studySchema);

export { Study };