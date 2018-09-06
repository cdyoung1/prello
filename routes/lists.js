var express = require('express');
var router = express.Router();
var status = require('http-status');
var createError = require('http-errors');
var db = require('../models/index');

/* GET home page. */
router.get('/', function(req,res,next) {
  let boardLists = req.session.currentBoardLists;
  console.log('boardLists', boardLists)
  res.render('lists', {lists: boardLists});
})
router.post('/current', function(req, res, next) {
  let boardIndex = req.body.index;
  console.log('boardindex', boardIndex);
  console.log(req)
  console.log('currentBoards', req.session.currentBoards);
  let boardID = req.session.currentBoards[parseInt(boardIndex)].id;
  req.session.currentBoard = boardID;
  let userListQuery = `
  SELECT 
    "name"
  FROM
    "lists"
  WHERE
    "boardID" = ${boardID}
  ORDER BY
    "order" ASC
  `
  db.sequelize.query(userListQuery, {
    type: db.sequelize.QueryTypes.SELECT
  })
  .then(response => {
    console.log('hello');
    console.log(response);
    var boardLists;
    if(response.length<=0) {
      // boardLists = [];
      req.session.currentBoardLists = [];
    } else {
      // boardLists = response;
      req.session.currentBoardLists = response;
    }
    console.log('cuurrent board list',req.session.currentBoardLists);
    res.render('lists', {lists: req.session.currentBoardLists});
  })
  .catch(err => {
      console.error(err);
      res.send(err);
  })
  return;
});

router.post('/create', function(req,res,next) {
  console.log(req.session);
  let boardID = req.session.currentBoards[0].id;
  console.log('boardID', boardID);
  let name = req.body.name;
  let order = req.body.order;
  let insertQuery = `
  INSERT INTO lists ("boardID", "name", "order")
  VALUES
    ('${boardID}','${name}', '${order}')
  RETURNING
  *
  `
  db.sequelize.query(insertQuery, {
    type: db.sequelize.QueryTypes.INSERT
  })
  .then(response => {
    let userListQuery = `
    SELECT 
      name
    FROM 
      lists
    WHERE
      "boardID" = ${boardID}
    ORDER BY
      "order" ASC      
    `

    db.sequelize.query(userListQuery, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(listResponse => {
      if(listResponse.length<=0) {
        // boardLists = [];
        req.session.currentBoardLists = [];
      } else {
        // boardLists = response;
        req.session.currentBoardLists = listResponse;
        console.log(req.session.currentBoardLists);
      }
      res.status(200).json(listResponse);
    })
    .catch(err => {
      console.error(err);
      res.send(err);

    })
    // console.log(response);
    // res.status(200).json(response);
  })
  .catch(err => {
    console.error(err);
    res.send(err);
  })
})

router.patch('/', function(req,res,next) {
  let newIndex = req.body.index;

})
module.exports = router;
