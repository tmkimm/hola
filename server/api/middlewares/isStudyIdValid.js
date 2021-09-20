import { Study } from '../../models/Study.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { CustomError } from "../../CustomError.js";
import  mongoose from 'mongoose';
// 스터디 id가 존재하는지 확인한다.
const isStudyIdValid = asyncErrorWrapper(async (req, res, next) => {
    const studyId = req.params.id;
    const { ObjectId } = mongoose.Types;

    if(!studyId || !ObjectId.isValid(studyId))
        throw new CustomError('NotFoundError', 404, 'Study not found');
    const study = await Study.findById(studyId);
    if(!study)
        throw new CustomError('NotFoundError', 404, 'Study not found');

    next();
});

export { isStudyIdValid };