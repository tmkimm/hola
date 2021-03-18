import { Study } from '../models/Study.js';

export default class StudyServcie {
    async findStudy(offset, limit, sort, language) {
        const studies = await Study.findStudy(offset, limit, sort, language);
        return studies;
    }

    async findById(id) {
        const studies = await Study.findById(id);
        return studies;
    }

    async registerComment(id, content, author) {
        const study = await Study.registerComment(id, content, author);
        return study;
    }

    async deleteStudy(id) {
        Study.deleteStudy(id);
    }
}