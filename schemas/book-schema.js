const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: 'String',
    description: 'String',
    author: 'String',
    commentary: 'String'
})

var Book = mongoose.model('book', bookSchema);

module.exports = Book