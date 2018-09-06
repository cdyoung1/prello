var express = require('express');
var router = express.Router();
var status = require('http-status');
var createError = require('http-errors');
var db = require('../models/index');
router.get('/', function(req, res, next) {
  let boardQuery = `
  SELECT 
    "title", 
    "id"
  FROM 
    boards
  WHERE
    "ownerID" = ${req.session.user.id}
  ORDER BY 
    "createdAt" ASC
  `
  db.sequelize.query(boardQuery, {
    type: db.sequelize.QueryTypes.SELECT
  })
  .then(response => {
    console.log('hi');
    var userBoards;
    if(response.length<=0) {
      userBoards = [];
    } else {
      userBoards = response
    }
    req.session.currentBoards = userBoards;
    console.log(userBoards);
    res.render('boards', {
      boards: req.session.currentBoards
    });
  })
  .catch(err => {
    console.error(err);
    res.send(err);
  })
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
  .then(function(e) {
    let boardQuery = `
    SELECT 
      "title", 
      "id"
    FROM 
      boards
    WHERE
      "ownerID" = ${req.session.user.id}
    ORDER BY 
      "createdAt" ASC
    `
    db.sequelize.query(boardQuery, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(response => {
      var userBoards = response;
      req.session.currentBoards = userBoards;
      console.log('currentBoards', req.session.currentBoards)
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    })
    let userLists = [];
    req.session.currentBoardLists = userLists;
    res.status(200).render('lists', {lists: userLists});
  })
  .catch(err => {
    console.error(err);
    res.send(err);
  })
})

module.exports = router;