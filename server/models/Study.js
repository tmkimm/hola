import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    content: String,    // 댓글 내용
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} // 댓글 등록자 정보
},
{
    versionKey: false,
    timestamps: true    // createdAt, updatedAt 컬럼 사용
});

const studySchema = mongoose.Schema({
    author      : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},  // 글 등록자 정보
    topic       : String,   // 글 주제(사용 X)
    language    : [String], // 사용 언어 리스트
    location    : String,   // 스터디 장소(사용 X)
    position    : [{ part: String,
                    personnel: Number}
                    ],      // 모집 인원 정보(사용 X)
    title       : String,   // 글 제목
    content     : String,   // 글 내용
    isDeleted   : { type: Boolean, default: false}, // 글 삭제 여부
    isClosed    : { type: Boolean, default: false}, // 글 마감 여부
    views       : { type: Number, default: 0 },     // 글 조회수
    comments    : [commentSchema],                  // 글 댓글 정보
    likes       : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] // 관심 등록한 사용자 리스트
},
{
    versionKey: false,
    timestamps: true
});

studySchema.set('toObject', { virtuals: true })
studySchema.set('toJSON', { virtuals: true })

// 좋아요 수
studySchema.virtual('likesCount').get(function () {
    return this.likes.length
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
    .where('isDeleted').equals(false)
    .sort(sortQuery.join(' '))
    .skip(Number(offsetQuery))
    .limit(Number(limitQuery))
    .select('-isDeleted -comments');
};

studySchema.statics.registerComment = async function(studyId, content, author) {
    return await Study.findByIdAndUpdate(
        { _id: studyId },
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

studySchema.statics.findComments = async function(id) {
    return await Study.findById(id).populate('comments.author', 'nickName image').select('-likesCount');
}

studySchema.statics.deleteStudy = async function(id) {
    await Study.findByIdAndUpdate(
        { _id: id },
        { isDeleted: true},
    );
}

studySchema.statics.modifyStudy = async function(id, study) {
    const studyRecord = await Study.findByIdAndUpdate(
        { _id: id },
        study,
        { 
          new: true
        }
      );
    return studyRecord;
}

studySchema.statics.modifyComment = async function(comment) {
    const commentRecord = await Study.findOneAndUpdate(
        {
            comments:
            {
                $elemMatch: { _id : comment.id } 
            }
        },
        {
            $set:
            {
                'comments.$.content' : comment.content
            }
        },
        { 
            new: true
        }
      );
    return commentRecord;
}

studySchema.statics.deleteComment = async function(id) {
    const commentRecord = await Study.findOneAndUpdate(
        { 
            comments:
            {
                $elemMatch: { _id : id } 
            }
        },
        {
            $pull: { comments: { _id: id } }
        }
      );
    return commentRecord;
}

studySchema.statics.addLike = async function(studyId, userId) {
    return await Study.findByIdAndUpdate(
        { _id: studyId },
        {
          $push: {
            likes: {
                _id: userId
            }
          }
        },
        {
          new: true,
          upsert: true
        }
      );
}

studySchema.statics.deleteLike = async function(studyId, userId) {
    const deleteRecord = await Study.findOneAndUpdate(
        { _id: studyId },
        {
            $pull: { likes: userId }
        }
      );
    return deleteRecord;
}


// 조회수 증가
studySchema.statics.increaseView = async function(studyId) {
    let studyRecord = await Study.findById({ _id: studyId });
    await Study.findOneAndUpdate(
        { _id: studyId },
        {
            views: studyRecord.views + 1
        }
      );
}

const Study = mongoose.model('Study', studySchema);

export { Study };