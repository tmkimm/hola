import { Study } from '../models/Study.js';

export default class StudyServcie {
    async findStudy(offset, limit, sort, language) {
        const studies = await Study.findStudy(offset, limit, sort, language);

        return studies;
    }

    async findOneStudy(sequence) {
        const studies = await Study.findOneStudy(sequence);

        return studies;
    }
}