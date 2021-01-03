const mongoose = require('mongoose');
const { Study } = require('../models/Study');
var express = require('express');
var router = express.Router();

/* GET study listing. */
router.get('/', function(req, res, next) {
  Study.find((err, studies) => {
    if (err) return res.status(500).json({ success: false, err });
    res.status(200).json(studies);
  })
});

/* POST study create. */
router.post('/', function(req, res, next) {
  const study = new Study(req.body);
  study.save((err, studies) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  })
});

module.exports = router;
