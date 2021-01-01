const mongoose = require('mongoose');
const { Study } = require('../models/Study');
var express = require('express');
var router = express.Router();

/* GET study listing. */
router.get('/', function(req, res, next) {
  res.send('study list');
});

/* POST study create. */
router.post('/', function(req, res, next) {
  res.send('create study');
  const study = new Study(req.body)
  study.save((err, data) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
});

module.exports = router;
