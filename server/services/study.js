import { Study } from '../models/Study.js';
import { User } from '../models/User.js';

export class StudyService {
    async findStudy(offset, limit, sort, language) {
        const studies = await Study.findStudy(offset, limit, sort, language);
        return studies;
    }

    async studyDetailView(studyId, userId) {
        const studies = await Study.findById(studyId).populate('author', 'nickName image').populate('comments.author', 'nickName image');
        if(userId) {
            await User.addReadList(studyId, userId);
        }
        return studies;
    }

    async registerStudy(userID, study) {
        study.author = userID;
        const studyRecord = await Study.create(study);
        return studyRecord;
    }

    async modifyStudy(id, study) {
        const studyRecord = await Study.modifyStudy(id, study);
        return studyRecord;
    }

    async deleteStudy(id) {
        await Study.deleteStudy(id);
    }


    async findComments(id) {
        const comments = await Study.findComments(id);
        return comments;
    }

    async registerComment(userID, comment) {
        const { studyId, content } = comment;
        const study = await Study.registerComment(studyId, content, userID);
        return study;
    }

    async modifyComment(comment) {
        const commentRecord = await Study.modifyComment(comment);
        return commentRecord;
    }
    async deleteComment(id) {
        await Study.deleteComment(id);
    }

    async addLike(studyId, userId) {
        const study = await Study.addLike(studyId, userId);
        const user = await User.addLikeStudy(studyId, userId);
        return study;
    }

    async deleteLike(studyId, userId) {
        const study = await Study.deleteLike(studyId, userId);
        const user = await User.deleteLikeStudy(studyId, userId);
        return study;
    }
}