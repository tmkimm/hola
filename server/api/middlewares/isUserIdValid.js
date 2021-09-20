import { User } from '../../models/User.js';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { CustomError } from "../../CustomError.js";
import  mongoose from 'mongoose';

// 사용자 id가 올바른지 확인한다.
const isUserIdValid = asyncErrorWrapper(async (req, res, next) => {
    const userId = req.params.id || req.body.id || req.query.id;
    const { ObjectId } = mongoose.Types;

    if(!userId || !ObjectId.isValid(userId))
        throw new CustomError('NotFoundError', 404, 'User not found');
    const user = await User.findById(userId);
    if(!user)
        throw new CustomError('NotFoundError', 404, 'User not found');

    next();
});

export { isUserIdValid };