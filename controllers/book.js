// book controller
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Book = require('../models/book');

const getAll = async (req, res) => {
  // #swagger.tags = ['Book']
  // #swagger.summary = 'Get all books'
  
  // const result = await mongodb.getDb().db().collection('books').find();

  const result = await Book.find().exec();

  // result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  // });
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Book']
  // #swagger.summary = 'Get book by id'
  const bookId = new ObjectId(req.params.id);

  // const result = await mongodb.getDb().db().collection('books').find({ _id: bookId });

  const result = await Book.findOne({ _id: bookId });

  // result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  // });
};

const createBook = async (req, res) => {
  // #swagger.tags = ['Book']
  // #swagger.summary = 'Create book'
  if (!req.body) {
    res.status(400).send({ message: "Request body cannot be empty" });
    return;
  }
  const book = new Book ({
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    genre: req.body.genre,
    publishYear: req.body.publishYear
  });

  // const response = await mongodb.getDb().db().collection('books').insertOne(book);

  const response = await book.save();

  if (response) {
    res.status(201).json({
      response: response,
      message: "Created new Book successfully.",
      book: book
    });
  } else {
      res.status(500).json(response.error || 'Some error occurred while creating the book.');
  }
};
  
  const updateBook = async (req, res) => {
    // #swagger.tags = ['Book']
    // #swagger.summary = 'Update book by id'
    if (!req.body) {
      res.status(400).send({ message: "Request body cannot be empty" });
      return;
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      genre: req.body.genre,
      publishYear: req.body.publishYear
    };
    // const response = await mongodb
    //   .getDb()
    //   .db()
    //   .collection('books')
    //   .replaceOne({ _id: bookId }, { book });

    const response = await Book.findOneAndUpdate(
        { _id: bookId},
        { $set: book },
        { new: true }
    ).exec();

    // console.log(response);
    if (response) {
      res.status(204).json({
        response: response,
        message: "Updated book successfully.",
        book: book
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
  };
  
  const deleteBook = async (req, res) => {
    // #swagger.tags = ['Book']
    // #swagger.summary = 'Delete book by id'
    const bookId = new ObjectId(req.params.id);
    // const response = await mongodb.getDb().db().collection('books').deleteOne({ _id: bookId }, true);

    const response = await Book.deleteOne({ _id: bookId});

    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).json({
        response: response,
        message: "Deleted book successfully.",
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the book.');
    }
  };

module.exports = { getAll, getSingle, createBook, updateBook, deleteBook };