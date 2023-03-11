// book controller
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Book = require('../models/book');

const getAll = async (req, res) => {
  // #swagger.tags = ['Book']
  // #swagger.summary = 'Get all books'
  const result = await mongodb.getDb().db().collection('books').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Book']
  // #swagger.summary = 'Get book by id'
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('books').find({ _id: bookId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createBook = async (req, res) => {
  // #swagger.tags = ['Book']
  // #swagger.summary = 'Create book'
  if (!req.body) {
    res.status(400).send({ message: "Request body cannot be empty" });
    return;
  }
  const book = new Book ({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    email: req.body.email
  });
  const response = await mongodb.getDb().db().collection('books').insertOne(book);
  if (response.acknowledged) {
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
    const book = new Book ({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      email: req.body.email
    });
    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .replaceOne({ _id: bookId }, { book });
    console.log(response);
    if (response.modifiedCount > 0) {
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
    const response = await mongodb.getDb().db().collection('books').deleteOne({ _id: bookId }, true);
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