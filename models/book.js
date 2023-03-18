// material/book model
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    pages: {type: String, required: true},
    genre: {type: String, required: true},
    publishYear: {type: String, required: true},
},
{
    collection: "books"
});

module.exports = mongoose.model('Book', bookSchema);