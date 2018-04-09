var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var registerSchema = require('../schemas/register-schema')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  if (
    typeof req.body.email != 'String' && 
    typeof req.body.user != 'String' && 
    typeof req.body.password != 'String'
  ) {
    res.status(403).send("ERROR");
  } else {
    registerSchema({
      email: req.body.email,
      user: req.body.user,
      password: req.body.password
    })
    registerSchema.save((err, prod) => {
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
      (err) ? res.status(403).send(
        {
          status: 'error',
          action: 'failed',
          content: {
            login: false,
            data: null
          }
        }
      ) : 
      console.log(obj)
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
    })
  }
}) 

module.exports = router;
