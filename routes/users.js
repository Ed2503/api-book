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

module.exports = router;
