import { Study } from '../../models/Study.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { CustomError } from "../../CustomError.js";
import  mongoose from 'mongoose';
// 회원 정보 수정 시 닉네임이 중복되었는지 체크한다.
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