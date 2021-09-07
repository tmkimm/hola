import { Study } from '../models/Study.js';
import { Notification } from '../models/Notification.js';

export class CommentService {
    // 스터디 id를 이용해 댓글 리스트를 조회한다.
    async findComments(id) {
        const comments = await Study.findComments(id);
        return comments;
    }

    // 신규 댓글을 추가한다.
    async registerComment(userID, comment) {
        const { studyId, commentId, content } = comment;
        const study = await Study.registerComment(studyId, content, userID);
        await Notification.registerNotification(studyId, study.author, userID, 'comment');   // 알림 등록
        return study;
    }

    // 댓글을 수정한다.
    async modifyComment(comment, tokenUserId) {
        await Study.chkeckCommentAuthorization(comment.id, tokenUserId);
        const commentRecord = await Study.modifyComment(comment);
        return commentRecord;
    }

    // 댓글을 삭제한다.
    async deleteComment(commentId, userId) {
        await Study.chkeckCommentAuthorization(commentId, userId);

        const studyRecord = await Study.deleteComment(commentId);
        await Notification.deleteNotification(studyRecord._id, studyRecord.author, userId, 'comment');   // 알림 삭제
    }
}