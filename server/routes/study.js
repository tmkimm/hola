const mongoose = require('mongoose');
const { Study } = require('../models/Study');
var express = require('express');
var router = express.Router();

/* GET study listing. */
router.get('/', function(req, res, next) {
  Study.find((err, studies) => {
    if (err)
      return res.status(400).json({message: "must be String", err });
    res.status(200).json(studies);
  })
});

/* POST study create. */
router.post('/', function(req, res, next) {
  const study = new Study(req.body);
  study.save((err, studies) => {
    if (err)
      return res.status(400).json({ errors: [
        {
          location: "body",
          param: "name",
          error: "TypeError",
          message: "must be String"
        }
      ], err });
    return res.status(201).json(studies);
  })
});

module.exports = router;
