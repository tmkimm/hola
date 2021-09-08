import mongoose from 'mongoose'; 
import { CustomError } from "../CustomError.js";

// 대댓글 스키마
const replySchema = mongoose.Schema({
    content: String,    // 댓글 내용
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} // 댓글 등록자 정보
},
{
    versionKey: false,
    timestamps: true    // createdAt, updatedAt 컬럼 사용
});

// 댓글 스키마
const commentSchema = mongoose.Schema({
    content: String,    // 댓글 내용
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},  // 댓글 등록자 정보
    replies: [replySchema]
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
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

studySchema.virtual('totalComments').get(function() {
    return this.comments.length
  });

// 최신, 트레딩 조회
studySchema.statics.findStudy = async function(offset, limit, sort, language, period, isClosed) {
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
        sortQuery.push('-createdAt');
    }
    else {
        sortQuery.push('createdAt');
    }
    // Query
    let query = {};
    if( typeof language !== 'undefined' )
        query.language = {$in: language.split(',')};

    if(!isNaN(period)) {
        let today = new Date();
        query.createdAt = {$gte: today.setDate(today.getDate() - period)};
    }

    // 마감된 글 안보기 기능(false만 지원)
    if(typeof isClosed === "string" && !(isClosed === 'true')) {
        query.isClosed = {$eq: (isClosed==='true')};
    }
        
    return await Study.find(query)
    .where('isDeleted').equals(false)
    .sort(sortQuery.join(' '))
    .skip(Number(offsetQuery))
    .limit(Number(limitQuery));
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
    .where('isClosed').equals(false)
    .sort(sortQuery.join(' '))
    .limit(limit)
    .select('-isDeleted');

    // 부족한 개수만큼 추가 조회
    if(studies.length < limit - 1) {
        let notInStudyIdArr = studies.map(study => {
            return study._id;
        });
        notInStudyIdArr.push(studyId);
        query._id = {$nin: notInStudyIdArr};    // 이미 조회된 글들은 중복 x
        delete query.language;
        let shortStudies = await Study.find(query)
        .where('isDeleted').equals(false)
        .where('isClosed').equals(false)
        .sort(sortQuery.join(' '))
        .limit(limit - studies.length)
        .select('-isDeleted');
        studies.push(...shortStudies);
    }
    return studies;
};

studySchema.statics.registerComment = async function(studyId, content, author) {
    let study;
    study = await Study.findOneAndUpdate(
        {_id: studyId},
        {$push: { 'comments': {content, author}}},
        {new: true, upsert: true}
    );
    return study;
}

studySchema.statics.registerReply = async function(studyId, commentId, content, author) {
    let study;
    study = await Study.findOneAndUpdate(
        {_id: studyId, comments: { $elemMatch: { _id : commentId } } },
        {$push: { 'comments.$.replies': {content,author}}},
        {new: true, upsert: true}
    );
    return study;
}

studySchema.statics.findComments = async function(id) {
    return await Study.findById(id).populate('comments.author', 'nickName image').populate('comments.replies.author', 'nickName image');
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

// 댓글 수정
studySchema.statics.modifyComment = async function(comment) {
    let commentRecord;
    let { id, content } = comment;

    commentRecord = await Study.findOneAndUpdate(
        { comments: { $elemMatch: { _id : id } } },
        { $set: { 'comments.$.content' : content } },
        { new: true }
    );
    return commentRecord;
}

// 대댓글 수정
studySchema.statics.modifyReply = async function(comment) {
    let commentRecord;
    let { id, content, commentId } = comment;
    commentRecord = await Study.findOneAndUpdate(
        { 
            'comments': { $elemMatch: { _id : commentId } } 
        },
        { 
            $set: { 'comments.$[].replies.$[i].content' : content }
        },
        {
            arrayFilters: [{'i._id': id}],
            new: true
        }
        );
    return commentRecord;
}

studySchema.statics.deleteComment = async function(id) {
    const commentRecord = await Study.findOneAndUpdate(
        { comments: { $elemMatch: { _id : id } }},
        { $pull: { comments: { _id: id } }}
      );
    return commentRecord;
}

studySchema.statics.deleteReply = async function(id) {
    const commentRecord = await Study.findOneAndUpdate(
        { 'comments.replies': { $elemMatch: { _id : id } }},
        { $pull: { 'comments.$.replies': { _id: id } }}
      );
    return commentRecord;
}

// 관심등록 추가
// 디바운스 실패 경우를 위해 예외처리
studySchema.statics.addLike = async function(studyId, userId) {
    let study = await Study.find({_id: studyId, likes: { $in: [userId]} });
    let isLikeExist = study.length > 0 ? true : false;

    if(!isLikeExist) {
        study = await Study.findByIdAndUpdate(
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
    } else {
        study = study[study.length - 1];
    }
    return { study, isLikeExist };
}

studySchema.statics.deleteLike = async function(studyId, userId) {
    const deleteRecord = await Study.findOneAndUpdate(
        { _id: studyId },
        {
            $pull: { likes: userId },
            $inc: {
              totalLikes : -1
            }
        },
        {
          new: true
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

// 댓글 등록한 사용자 아이디 조회
studySchema.statics.findAuthorByCommentId = async function(commentId) {
    let study = await Study.findOne({comments: { $elemMatch: { _id : commentId } }});
    if(study) {
        let { author } = study.comments[study.comments.length -1];
        return author;
    } else {
        return null;
    }
}

// 대댓글 등록한 사용자 아이디 조회
studySchema.statics.findAuthorByReplyId = async function(replyId) {
    let study = await Study.findOne({'comments.replies': { $elemMatch: { _id : replyId } }});
    if(study) {
        let { author } = study.comments[study.comments.length -1];
        return author;
    } else {
        return null;
    }
    
}

// 스터디 수정 권한 체크
studySchema.statics.chkeckStudyAuthorization = async function(studyId, tokenUserId) {
    const study = await Study.findOne({_id: studyId, author: tokenUserId});  
    if(!study) {
        throw new CustomError('NotAuthenticatedError', 401, 'User does not match');
    }
}

// 댓글 수정 권한 체크
studySchema.statics.chkeckCommentAuthorization = async function(commentId, tokenUserId) {
    const study = await Study.findOne({comments: { $elemMatch: { _id : commentId, author : tokenUserId }}});  
    if(!study) {
        throw new CustomError('NotAuthenticatedError', 401, 'User does not match');
    }
}

// 대댓글 수정 권한 체크
studySchema.statics.chkeckReplyAuthorization = async function(replyId, tokenUserId) {
    const study = await Study.findOne({'comments.replies': { $elemMatch: { _id : replyId, author : tokenUserId }}});  
    if(!study) {
        throw new CustomError('NotAuthenticatedError', 401, 'User does not match');
    }
}


const Study = mongoose.model('Study', studySchema);

export { Study };