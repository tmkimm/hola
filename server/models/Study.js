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
    likes       : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], // 관심 등록한 사용자 리스트
    totalLikes  : { type: Number, default: 0 },     // 관심 등록 수
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

// 최신, 트레딩 조회
studySchema.statics.findStudy = async function(offset, limit, sort, language) {
    // Pagenation
    let offsetQuery = parseInt(offset) || 0;
    let limitQuery = parseInt(limit) || 20;
    
    let sortQuery = [];
    //Sorting
    if(sort) {
        const sortableColumns = ['views', 'createdAt', 'totalLikes'];
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

    return await Study.find(query, {language:{$slice: [0, 3]}})
    .where('isDeleted').equals(false)
    .sort(sortQuery.join(' '))
    .skip(Number(offsetQuery))
    .limit(Number(limitQuery))
    .select('-isDeleted -comments');
};

// 사용자에게 추천 조회
studySchema.statics.findStudyRecommend = async function(sort, language, studyId, userId, limit) {
    let sortQuery = [];
    //Sorting
    if(sort) {
        const sortableColumns = ['views', 'createdAt', 'totalLikes'];
        sortQuery = sort.split(',').filter(value => {
            return sortableColumns.indexOf(value.substr(1,value.length)) != -1 || sortableColumns.indexOf(value) != -1
        });
    }
    else {
        sortQuery.push('createdAt');
    }
    // Query
    let query = {};
    if( typeof language == 'object' && language.length > 0 )
        query.language = {$in: language};

    // 14일 이내 조회
    let today = new Date();
    query.createdAt = {$gte: today.setDate(today.getDate() - 14)};

    // 현재 읽고 있는 글은 제외하고 조회
    query._id = {$ne: studyId};

    // 사용자가 작성한 글 제외하고 조회
    if(userId)
        query.author = {$ne: userId};
  
    let studies =  await Study.find(query)
    .where('isDeleted').equals(false)
    .sort(sortQuery.join(' '))
    .limit(limit)
    .select('-isDeleted -comments');

    // 부족한 개수만큼 추가 조회
    if(studies.length < limit - 1) {
        let notInStudyIdArr = studies.map(study => {
            return study._id;
        });
        query._id = {$nin: notInStudyIdArr};    // 이미 조회된 글들은 중복 x
        delete query.language;
        let shortStudies = await Study.find(query)
        .where('isDeleted').equals(false)
        .sort(sortQuery.join(' '))
        .limit(limit - studies.length)
        .select('-isDeleted -comments');
        studies.push(...shortStudies);
    }
    return studies;
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
    return await Study.findById(id).populate('comments.author', 'nickName image');
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
          },
          $inc: {
            totalLikes : 1
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
            $pull: { likes: userId },
            $inc: {
              totalLikes : -1
            }
        }
      );
    return deleteRecord;
}
// 조회수 증가
studySchema.statics.increaseView = async function(studyId) {
    await Study.findOneAndUpdate(
        { _id: studyId },
        {
          $inc: {
            views : 1
          }
        }
      );
}

const Study = mongoose.model('Study', studySchema);

export { Study };