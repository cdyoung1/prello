var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize("project2", "project2", "project2", {
  dialect: 'postgres'
});
/* GET users listing. */
module.exports = router;
router.get('/')
router.post('/login', function(req, res) {
});