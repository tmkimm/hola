import {body, validationResult} from 'express-validator';

const checkStudy = [
  // body('topic').isString().withMessage('Invaild datatype(String)'),
  // body('language').isArray().withMessage('Invaild datatype(Array)'),
  // body('location').isString().withMessage('Invaild datatype(String)'),
  // body('position').isArray().withMessage('Invaild datatype(Array)'),
  // body('position.*.part').isString().withMessage('Invaild datatype(String)'),
  // body('position.*.personnel').isNumeric().withMessage('Invaild datatype(Number)'),
  body('title').isString().withMessage('Invaild datatype(String)'),
  body('content').isString().withMessage('Invaild datatype(String)')
];

// Study 유효성 검증 미들웨어
const isStudyValid = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });  
  next();
};

export {
  checkStudy,
  isStudyValid
}