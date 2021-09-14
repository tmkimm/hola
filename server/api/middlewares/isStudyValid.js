import {body, validationResult} from 'express-validator';
import { asyncErrorWrapper } from '../../asyncErrorWrapper.js';
import { CustomError } from "../../CustomError.js";
import languageList from "../../languageList.js";

const checkStudy = [
  body('title').isString().withMessage('Invaild datatype(String)').optional({nullable: true}),
  body('content').isString().withMessage('Invaild datatype(String)').optional({nullable: true}),
  body('language').isArray().withMessage('Invaild datatype(Array)').optional({nullable: true}),
  body('language')
  .custom((language) => {
      return language.every((item) => {
        return languageList.indexOf(item) > 0 ? true: false
      })
  })
  .withMessage( "Invaild language list").optional({nullable: true})
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