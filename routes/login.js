var express = require('express');
var router = express.Router();
var status = require('http-status');
var createError = require('http-errors');
var db = require('../models/index');
/* GET home page. */
router.get('/', function(req,res){
    console.log('hihi')
    res.render('login', {});
    return;
})

router.post('/', function(req, res,next) {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    if (email === undefined || email === ''){
        res.render('login', {
            error: 'Invalid Email or Password'
        });
        next(createError(401));
        return;
    }
    if (password === undefined || password === ''){
        res.render('login', {
            error: 'Invalid Email or Password'
        });
        next(createError(401));
        return;
    }
    let query = `SELECT * FROM users WHERE email= :email`;
    db.sequelize.query(query, {
        replacements: {
            email:email
        },
        type: db.sequelize.QueryTypes.SELECT
    })
    .then(response => {
        if(response.length<=0) {
            console.log('no response')
            res.render('login', {
                error: 'Invalid Email or Password'
            });
            next(createError(401));
            return;
        }
        if(response[0].password != password) {
            console.log('wrong password')
            next(creatError(403));
            return;
        }
        delete response[0].password; // delete the password from the session
        req.session.user = response[0];  //refresh the session value
        res.locals.user = response[0];
        res.status(200).json(req.session.user);
    })
    .catch(err => {
        console.log(err)
    })
  });
module.exports = router;
