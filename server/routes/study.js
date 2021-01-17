const mongoose = require('mongoose');
const { Study } = require('../models/Study');
var express = require('express');
var router = express.Router();
var {body, validationResult} = require('express-validator');

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

/* GET study listing. */
router.get('/', function(req, res, next) {
  Study.find((err, studies) => {
    if (err)
      return res.status(400).json({message: 'must be String', err });
    res.status(200).json(studies);
  })
});

/* POST study create. */
router.post('/', checkStudy, isStudyValid, function(req, res, next) {
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

module.exports = router;