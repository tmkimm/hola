// 추천 api 고민
/*

메인 페이지에서의 추천 목록 - 내 관심 기술 태그 + 조회수 정렬 + 최근 10일
글에서의 추천 목록  - 읽고 있는 글 기술 태그 + 조회수 정렬 + 최근 10일

#. 기술 태그가 모두 일치하는 것이 아닌 하나라도 같은 글을 추천
 - 예를 들어 내 관심 기술 태그가 javascript, react일 경우 
   react + spring, javascript + react 추천
 - 추천 글이 모두 같은 언어가 아니므로 각 글마다 언어 로고가 들어가야함
#. 눈물이 앞을 가리지만 해당되는 글이 없을 경우 조회수 정렬 + 최근 10로만 추천
#. 로그인하지 않은 사용자는 메인 페이지에서 관심 기술 태그가 없으므로 좋아요 수 + 최근 10일
 - 트렌딩와 같은 글이 조회될 수 있으므로 트렌딩은 조회수 순으로, 추천은 좋아요 순으로


메인 페이지에서 추천 - /studies/recommend
글에서의 추천 - /studies/:id/recommend


route
메인 페이지 추천 - 유저 id, 
글에서의 추천 - 글 id, 

service
메인 - 유저 id로 관심 기술 태그 받음
      정렬은 조회수
      기간 10일

      if 유저 아이디가 없다면 좋아요 정렬, 최근 10일
      
      
글 - 글 id로 기술 태그 조회
    정렬 조회수 기간 10일
    if 해당되는 데이터가 없다면 조회수 정렬, 최근 10일

models
실제 쿼리 부분 언어, 정렬 입력받아서 find / 기간은 최근 10일 fix
언어가 없다면 그냥, 정렬이 없으면 조회수 기간이 없으면 10일


라우터에서 데이터만 전달하면 service에서 알아서 처리하는 구조로. 당연하넹
데이터 수집 서버 놔둬서 제대로 만들어보고싶다.
*/
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
  
    return await Study.find(query)
    .where('isDeleted').equals(false)
    .sort(sortQuery.join(' '))
    .skip(Number(offsetQuery))
    .limit(Number(limitQuery))
    .select('-isDeleted -comments');
};

// 사용자에게 추천 조회
studySchema.statics.findStudyRecommend = async function(sort, language) {
    console.log(`sort : ${sort} language : ${language}`);
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
        query.language = {$in: language};

    // 14일 이내 조회
    let today = new Date();
    query.createdAt = {$gte: today.setDate(today.getDate() - 14)};
  
    return await Study.find(query)
    .where('isDeleted').equals(false)
    .sort(sortQuery.join(' '))
    .limit(5)
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