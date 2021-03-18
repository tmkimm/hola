import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    content: String,
    author: String
},
{
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
    comments    : [commentSchema]
},
{
    versionKey: false
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
    //query.isDeleted = false;
    if( typeof language !== 'undefined' )
        query.language = {$in: language.split(',')};
  
    return await Study.find(query)
    //.where('isDeleted').equals(false)
    .sort(sortQuery.join(' '))
    .skip(Number(offsetQuery))
    .limit(Number(limitQuery))
    .select('-isDeleted -comments');
};

studySchema.statics.registerComment = async function(id, content, author) {
    return await Study.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            comments: {
              content,
              author
            }
          }
        },
        {
          new: true,
          upsert: true
        }
      );
}

studySchema.statics.deletestudy = function(id) {
    const isDeleted = Study.findByIdAndUpdate(
        { _id: id },
        { isDeleted: true}
      );
}

const Study = mongoose.model('Study', studySchema);

export { Study };