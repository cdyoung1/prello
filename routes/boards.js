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
  let boardTitle = req.body.title;
  let ownerID = req.session.user.id;

  let insertQuery = `
  INSERT INTO boards (title, ownerID)
  VALUES
    ('${boardTitle}', '${ownerID}')
  RETURNING
  *
  `
  db.sequelize.query(insertQuery, {
    type: db.sequelize.QueryTypes.INSERT,
    replacements: {
      title: boardTitle,
      ownerID: ownerID
    }
  })
  .then(response => {
    res.render('index', {});
  })
  .catch(err => {
    res.send(err);
  })
})

module.exports = router;