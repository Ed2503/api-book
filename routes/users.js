var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var registerSchema = require('../schemas/register-schema')

/* GET users listing. */

router.post('/register', (req, res, next) => {
  if (
    typeof req.body.email != 'string' && 
    typeof req.body.user != 'string' && 
    typeof req.body.password != 'string'
  ) {
    res.status(403).send("ERROR");
  } else {
    const registro = new registerSchema({
      email: req.body.email,
      user: req.body.user,
      password: req.body.password
    })
    registro.save((err, prod) => {
      err ? 
      console.error('Error in the save!!') 
      : 
      console.log('User save!!')
      res.status(200).send(
        {
          status: 'ok',
          action: 'correct',
          content: {
            register: true
          }
        }
      )
    })
  }
})

router.post('/login', (req, res, next) => {
  var autentication = req.session.autenticado;
  if (autentication == undefined || autentication == null) {
    registerSchema.findOne({
      user: req.body.user,
      password: req.body.password
    }, (err, obj) => {
      if (err) { res.status(200).send(
        {
          status: 'error',
          action: 'failed',
          content: 'Error undefined'
        }
      ) }
      else if (obj) {
        res.status(200).send(
          {
            status: 'ok',
            action: 'correct',
            content: {
              login: true,
              data: obj
            }
          }
        )
        autentication = true
      } else {
        res.status(200).send(
          {
            status: 'failed',
            action: 'correct',
            content: {
              login: false,
              err: 'The user no exist!!'
            }
          }
        )
      }
    })
  }
}) 

module.exports = router;
