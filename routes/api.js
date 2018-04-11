const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose')
const apiSchema = require('../schemas/book-schema')

const authorized = (req, res, next) => {
  if (req.session.authorized == true) { 
    next() 
  } else { 
    res.status(401).send({
      status: 'ok',
      action: 'error',
      content: {
        error: 'Not authorized'
      }
    })
  }
}

router.use(authorized)

router.get('/book', function(req, res, next) {
  apiSchema.find((err, result) => {
    if (err) {
      res.status(500).send('ERROR')
    } else {
      res.status(200).send({
        status: 'ok',
        action: 'correct',
        content: {
          data: result
        }
      })
    }
  })
});

router.post('/create', (req, res, next) => {
  const createElement = new apiSchema({
    title: req.body.title,
    description: req.body.title,
    author: req.body.author,
    commentary: req.body.commentary
  })
  createElement.save(err => {
    if (err) {
      res.status(500)
    } else {
      res.status(200).send({
        status: 'ok',
        action: 'correct',
        content: {
          save: true
        }
      })
    }
  })
})

router.post('/delete', (req, res, next) => {
  apiSchema.remove({_id: req.body.id}, err => {
    if (err) {
      res.status(500).send('ERROR')
    } else {
      res.status(200).send({
        status: 'ok',
        action: 'correct',
        content: {
          delete: true
        }
      })
    }
  })
})

module.exports = router;