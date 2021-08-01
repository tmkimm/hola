import {body, validationResult} from 'express-validator';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { CustomError } from "../../CustomError.js";

const checkStudy = [
  body('title').isString().withMessage('Invaild datatype(String)'),
  body('content').isString().withMessage('Invaild datatype(String)'),
  body('language').isArray().withMessage('Invaild datatype(Array)')
];

// Study 유효성 검증 미들웨어
const isStudyValid = asyncErrorWrapper(async function(req, res, next) {
  const errors = await validationResult(req);
  if(!errors.isEmpty()) {
    throw new CustomError('ContentInvaildError', 400, errors.array()[0].msg);
  }

  next();
});

export {
  checkStudy,
  isStudyValid
}