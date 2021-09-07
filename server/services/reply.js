import { Study } from '../models/Study.js';
import { Notification } from '../models/Notification.js';

export class ReplyService {

    // 신규 대댓글을 추가한다.
    async registerReply(userID, comment) {
        const { studyId, commentId, content } = comment;
        const study = await Study.registerReply(studyId, commentId, content, userID);

        // 대댓글 등록 시 댓글 등록자에게 달림 추가
        let author = await Study.findAuthorByCommentId(commentId);
        await Notification.registerNotification(studyId, author, userID, 'reply');        // 알림 등록
        
        return study;
    }

    // 대댓글을 수정한다.
    async modifyReply(comment, tokenUserId) {
        await Study.chkeckReplyAuthorization(comment.id, tokenUserId);
        const commentRecord = await Study.modifyReply(comment);
        return commentRecord;
    }

    // 대댓글을 삭제한다.
    async deleteReply(replyId, userId) {
        await Study.chkeckReplyAuthorization(replyId, userId);
        let author = await Study.findAuthorByReplyId(replyId);
        const studyRecord = await Study.deleteReply(replyId);
        await Notification.deleteNotification(studyRecord._id, author, userId, 'reply');   // 알림 삭제
    }
}