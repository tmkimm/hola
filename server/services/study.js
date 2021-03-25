import { Study } from '../models/Study.js';

export class StudyServcie {
    async findStudy(offset, limit, sort, language) {
        const studies = await Study.findStudy(offset, limit, sort, language);
        return studies;
    }

    async findById(id) {
        const studies = await Study.findById(id);
        return studies;
    }

    async registerStudy(study) {
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

    async registerComment(comment) {
        const { studyId, content, author } = comment;
        const study = await Study.registerComment(studyId, content, author);
        return study;
    }

    async modifyComment(comment) {
        const commentRecord = await Study.modifyComment(comment);
        return commentRecord;
    }
    async deleteComment(id) {
        await Study.deleteComment(id);
    }
}