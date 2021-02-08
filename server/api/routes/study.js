import { Router } from 'express'; 
import { Study } from '../../models/Study.js';
import {body, validationResult} from 'express-validator';
const route = Router();

const checkStudy = [
  body('topic').isString().withMessage('Invaild datatype(String)'),
  body('language').isArray().withMessage('Invaild datatype(Array)'),
  body('location').isString().withMessage('Invaild datatype(String)'),
  body('position').isArray().withMessage('Invaild datatype(Array)'),
  body('position.*.part').isString().withMessage('Invaild datatype(String)'),
  body('position.*.personnel').isNumeric().withMessage('Invaild datatype(Number)'),
  body('title').isString().withMessage('Invaild datatype(String)'),
  body('content').isString().withMessage('Invaild datatype(String)')
];

// Study 유효성 검증 미들웨어
let isStudyValid = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });  
  next();
};

export default (app) => {
  app.use('/study', route);
  
  /* GET study list. */
  route.get('/', function(req, res, next) {
    let limit = 20;
    let offset = 0;

    if(typeof req.query.limit !== 'undefined')
      limit = req.query.limit;
    
    if(typeof req.query.offset !== 'undefined')
      offset = req.query.offset;
    
    Study.find((err, studies) => {
      if (err)
        return res.status(400).json({message: 'must be String', err });
      res.status(200).json(studies);
    })
    .limit(Number(limit))
    .skip(Number(offset))
  });

  /* POST study create. */
  route.post('/', checkStudy, isStudyValid, function(req, res, next) {
    const study = new Study(req.body);
    study.save((err, studies) => {
      if (err)
        return res.status(400).json({ errors: [
          {
            location: 'body',
            param: 'name',
            error: 'TypeError',
            message: 'must be String'
          }
        ], err });
      return res.status(201).json(studies);
    })
  });
}