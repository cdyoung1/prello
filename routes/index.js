var express = require('express');
var router = express.Router();
var status = require('http-status');
var createError = require('http-errors');
var db = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Prello | Lists'})
  return;
});

module.exports = router;
