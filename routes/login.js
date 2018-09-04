var express = require('express');
var router = express.Router();
var status = require('http-status');
var createError = require('http-errors');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var db = require('../models/index');
/* GET home page. */
router.get('/', function(req,res){
    res.render('login', {});
    return;
})
router.post('/signup', function(req,res,next) {
    let firstName = req.body.first;
    let lastName = req.body.last;
    let email = req.body.email;
    let password = req.body.password;

    if (firstName === undefined || firstName === ''){
        res.render('login', {
            error: 'Invalid First or Last Name'
        });
        next(createError(401));
        return;
    }
    if (lastName === undefined || lastName === ''){
        res.render('login', {
        error: 'Invalid First or Last Name'
        });
        next(createError(401));
        return;
    }
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
    let query = `SELECT * FROM users WHERE email = '${email}'`
    db.sequelize.query(query, {
        replacements: {
            email:email
        },
        type: db.sequelize.QueryTypes.SELECT
    })
    .then(response => {
        if(response.length>0) {
            console.log('User already exists');
            next(createError(401));
            res.render('login', {
                error: 'User already exists!'
            });
        }
        else {
            bcrypt.hash(`'${password}'`,10, function(err, hash) {
                let insertQuery = 
                `INSERT INTO users (password, email, first, last) 
                VALUES 
                    ('${hash}', '${email}', '${firstName}', '${lastName}')
                RETURNING
                *
                `
                db.sequelize.query(insertQuery, {
                    type: db.sequelize.QueryTypes.INSERT,
                    replacements: {
                        password: password,
                        email: email,
                        first: firstName,
                        last: lastName
                    }
                })
                .then(response => {
                    console.log(response[0][0]);
                    let newUser = response[0][0];
                    delete newUser.password;
                    req.session.user = newUser;
                    let initials = newUser.first.charAt(0)+newUser.last.charAt(0);
                    res.render('boards');
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send(err.message);
                })
            });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send(err.message);
    })
})
router.post('/', function(req, res,next) {
    let email = req.body.email;
    let password = req.body.password;
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
        bcrypt.compare(`'${password}'`, response[0].password, function(err, passwordres) {
            if(passwordres) {
                console.log('response', response);
                delete response[0].password; // delete the password from the session
                req.session.user = response[0];  //refresh the session value
                res.locals.user = response[0];
                res.status(200).render('boards', {});
                // res.status(200).send({id: req.session.user.id});
            } else {
                console.log('wrong password')
                return;
            } 
          });
    })
    .catch(err => {
        console.log(err)
    })
  });
  
 
module.exports = router;
