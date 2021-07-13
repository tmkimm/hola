import { Study } from '../models/Study.js';
import { User } from '../models/User.js';

export class StudyService {

    // 메인 화면에서 스터디 리스트를 조회한다.
    async findStudy(offset, limit, sort, language) {
        const studies = await Study.findStudy(offset, limit, sort, language);
        return studies;
    }

    // 상세 스터디 정보를 조회한다.
    // 로그인된 사용자일 경우 읽은 목록을 추가한다.
    async studyDetailView(studyId, userId) {
        const studies = await Study.findById(studyId).populate('author', 'nickName image').populate('comments.author', 'nickName image');
        
        // 조회수 증가
        Study.increaseView(studyId);

        // 읽은 목록 추가
        if(userId) {
            await User.addReadList(studyId, userId);
        }
        return studies;
    }

    // 신규 스터디를 등록한다.
    async registerStudy(userID, study) {
        study.author = userID;
        const studyRecord = await Study.create(study);
        return studyRecord;
    }

    // 스터디 정보를 수정한다.
    async modifyStudy(id, study) {
        const studyRecord = await Study.modifyStudy(id, study);
        return studyRecord;
    }

    // 스터디를 삭제한다.
    async deleteStudy(id) {
        await Study.deleteStudy(id);
    }

    // 스터디 id를 이용해 댓글 리스트를 조회한다.
    async findComments(id) {
        const comments = await Study.findComments(id);
        return comments;
    }

    // 신규 댓글을 추가한다.
    async registerComment(userID, comment) {
        const { studyId, content } = comment;
        const study = await Study.registerComment(studyId, content, userID);
        return study;
    }

    // 댓글을 수정한다.
    async modifyComment(comment) {
        const commentRecord = await Study.modifyComment(comment);
        return commentRecord;
    }

    // 댓글을 삭제한다.
    async deleteComment(id) {
        await Study.deleteComment(id);
    }

    // 관심 등록 추가
    async addLike(studyId, userId) {
        const study = await Study.addLike(studyId, userId);
        const user = await User.addLikeStudy(studyId, userId);
        return study;
    }

    // 관심 등록 취소(삭제)
    async deleteLike(studyId, userId) {
        const study = await Study.deleteLike(studyId, userId);
        const user = await User.deleteLikeStudy(studyId, userId);
        return study;
    }
}