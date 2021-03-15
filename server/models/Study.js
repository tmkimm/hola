import mongoose from 'mongoose';
import autoincrement from 'mongoose-auto-increment';

const commentSchema = mongoose.Schema({
    contents: String,
    author: String
},
{
    timestamps: true,
    versionKey: false
});

const studySchema = mongoose.Schema({
    author      : String,
    topic       : String,
    language    : [String],
    location    : String,
    position    : [{ part: String,
                    personnel: Number}
                    ],
    title       : String,
    content     : String,
    isDeleted   : { type: Boolean, default: false},
    views       : { type: Number, default: 0 },
    sequence       : { type: Number, default: 0 },
    comments    : [commentSchema]
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

studySchema.statics.findStudy = async function(offset, limit, sort, language) {
    // Pagenation
    let offsetQuery = parseInt(offset) || 0;
    let limitQuery = parseInt(limit) || 20;
    
    let sortQuery = [];
    //Sorting
    if(sort) {
        const sortableColumns = ['views', 'createdAt'];
        sortQuery = sort.split(',').filter(value => {
            return sortableColumns.indexOf(value.substr(1,value.length)) != -1 || sortableColumns.indexOf(value) != -1
        });
    }
    else {
        sortQuery.push('createdAt');
    }

    // Query
    let query = {};
    if( typeof language !== 'undefined' )
        query.language = {$in: language.split(',')};
  
    return await Study.find(query)
    .sort(sortQuery.join(' '))
    .skip(Number(offsetQuery))
    .limit(Number(limitQuery));
};

studySchema.statics.findOneStudy = async function(sequence) {
    return this.findOne({ sequence: sequence });
}

const Study = mongoose.model('Study', studySchema);

export { Study };