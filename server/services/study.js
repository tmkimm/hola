import { Study } from '../models/Study.js';
import { User } from '../models/User.js';
import { Notification } from '../models/Notification.js';
import sanitizeHtml from 'sanitize-html';

export class StudyService {

    // 메인 화면에서 스터디 리스트를 조회한다.
    async findStudy(offset, limit, sort, language, period, isClosed) {
        const studies = await Study.findStudy(offset, limit, sort, language, period, isClosed);
        const sortStudies = this.sortLanguageByQueryParam(studies, language);
        return sortStudies;
    }

    // 선택한 언어가 리스트의 앞에 오도록 정렬
    async sortLanguageByQueryParam(studies, language) {
        if( typeof language == 'undefined' )
            return studies;

        const paramLanguage = language.split(',');
        for (let i = 0 ; i < studies.length; i++) {
            studies[i].language.sort(function(a, b) {
                if(paramLanguage.indexOf(b) != -1) return 1;
                else  return -1;
            })
        } 
        return studies;
    }

    // 메인 화면에서 스터디를 추천한다.
    // 4건 이하일 경우 무조건 다시 조회가 아니라, 해당 되는 건은 포함하고 나머지 건만 조회해야함
    async recommendToUserFromMain(userId) {
        let sort, likeLanguages, limit = 20;
        if(userId) {
            let user = await User.findById(userId);
            likeLanguages = user.likeLanguages;
            sort = 'views';
        }
        else {
            sort = 'totalLikes';
        }

        let studies = await Study.findStudyRecommend('-views', likeLanguages, null, limit);
        return studies;
    }

    // 글에서 스터디를 추천한다.
    // 4건 이하일 경우 무조건 다시 조회가 아니라, 해당 되는 건은 포함하고 나머지 건만 조회해야함
    async recommendToUserFromStudy(studyId, userId) {
        let sort = '-views', language, limit = 10;
        if(studyId) {
            let study = await Study.findById(studyId);
            language = study.language;
        }

        let studies = await Study.findStudyRecommend(sort, language, studyId, userId, limit);
        return studies;
    }

    // 상세 스터디 정보를 조회한다.
    // 로그인된 사용자일 경우 읽은 목록을 추가한다.
    async findStudyDetail(studyId, userId) {
        const studies = await Study.findById(studyId).populate('author', 'nickName image').populate('comments.author', 'nickName image');
        
        // 조회수 증가
        Study.increaseView(studyId);

        // 읽은 목록 추가
        if(userId) {
            await User.addReadList(studyId, userId);
        }
        return studies;
    }

    // 알림을 읽음 표시하고 상세 스터디 정보를 조회한다.
    async findStudyDetailAndUpdateReadAt(studyId, userId) {
        if(userId) {
            await Notification.updateReadAt(studyId, userId);
        }
        return await this.findStudyDetail(studyId, userId);
    }

    // 사용자의 관심 등록 여부를 조회한다.
    async findUserLiked(studyId, userId) {
        if(userId && studyId) {
            const studies = await Study.find({_id : studyId, likes : userId});
            let isLiked = studies.length > 0 ? true : false;
            return isLiked;
        } else {
            return false;
        }
    }

    // 스터디의 관심 등록한 사용자 리스트를 조회한다.
    async findLikeUsers(studyId) {
        if(studyId) {
            const likeUsers = await Study.findById(studyId).select('likes');
            return likeUsers.likes;
        } else {
            return [];
        }
    }

    // 신규 스터디를 등록한다.
    async registerStudy(userID, study) {
        study.author = userID;
        if(study.content) {
            let cleanHTML = sanitizeHtml(study.content, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
              });
            study.content = cleanHTML;
        }
        const studyRecord = await Study.create(study);
        return studyRecord;
    }

    // 스터디 정보를 수정한다.
    async modifyStudy(id, study) {
        if(study.content) {
            let cleanHTML = sanitizeHtml(study.content, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
              });
            study.content = cleanHTML;
        }
        const studyRecord = await Study.modifyStudy(id, study);
        return studyRecord;
    }

    // 스터디를 삭제한다.
    async deleteStudy(id) {
        await Study.deleteStudy(id);
        await Notification.deleteNotificationByStudy(id);   // 글 삭제 시 관련 알림 제거
    }

    // 스터디 id를 이용해 댓글 리스트를 조회한다.
    async findComments(id) {
        const comments = await Study.findComments(id);
        return comments;
    }

    // 신규 댓글을 추가한다.
    async registerComment(userID, comment) {
        const { studyId, commentId, content } = comment;
        const study = await Study.registerComment(studyId, commentId, content, userID);

        // 대댓글
        if(commentId) {
            // 대댓글 등록 시 댓글 등록자에게 달림 추가
            let author = await Study.findAuthorByCommentId(commentId);
            await Notification.registerNotification(studyId, author, userID, 'reply');        // 알림 등록
        } else {
            // 댓글
            await Notification.registerNotification(studyId, study.author, userID, 'comment');   // 알림 등록
        }
        return study;
    }

    // 댓글을 수정한다.
    async modifyComment(comment) {
        const commentRecord = await Study.modifyComment(comment);
        return commentRecord;
    }

    // 댓글을 삭제한다.
    async deleteComment(commentId, userId) {
        const studyRecord = await Study.deleteComment(commentId);
        await Notification.deleteNotification(studyRecord._id, studyRecord.author, userId, 'comment');   // 알림 삭제
    }

    // 대댓글을 삭제한다.
    async deleteReply(replyId, userId) {
        let author = await Study.findAuthorByReplyId(replyId);
        const studyRecord = await Study.deleteReply(replyId);
        await Notification.deleteNotification(studyRecord._id, author, userId, 'reply');   // 알림 삭제
    }

    // 관심 등록 추가  
    async addLike(studyId, userId) {
        const {study, isLikeExist} = await Study.addLike(studyId, userId);
        if(!isLikeExist) {
            await User.addLikeStudy(studyId, userId);
            await Notification.registerNotification(studyId, study.author, userId, 'like');   // 알림 등록
        }
        return study;
    }

    // 관심 등록 취소(삭제)
    async deleteLike(studyId, userId) {
        const study = await Study.deleteLike(studyId, userId);
        await User.deleteLikeStudy(studyId, userId);
        await Notification.deleteNotification(studyId, study.author, userId, 'like');   // 알림 삭제
        return study;
    }
}