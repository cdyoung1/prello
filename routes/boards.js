var express = require('express');
var router = express.Router();
var status = require('http-status');
var createError = require('http-errors');
var db = require('../models/index');

router.get('/', function(req, res, next) {
  res.render('boards', { title: 'Boards' });
  return;
});

router.post('/personal', function(req,res,next) {
  let title = req.body.title;
  let ownerID = req.session.user.id;

  let insertQuery = `
  INSERT INTO boards ("title", "ownerID", "lastViewed")
  VALUES
    ('${title}', '${ownerID}', DEFAULT)
  RETURNING
  *
  `
  db.sequelize.query(insertQuery, {
    type: db.sequelize.QueryTypes.INSERT
  })
  .then(response => {
    console.log(response[0][0]);
    req.session.currentBoard = response[0][0];
    res.status(200).render('index.ejs', {title: 'Prello | Lists'});
  })
  .catch(err => {
    console.error(err);
    res.send(err);
  })
})

module.exports = router;