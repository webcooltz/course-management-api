// book controller
const ObjectId = require('mongodb').ObjectId;
const Book = require('../models/book');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
  // #swagger.tags = ['Book']
  // #swagger.summary = 'Get all books'
  const books = await Book.find();
  if (books) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } else {
    res.status(500).json({ error: 'Unable to retrieve books' });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Book']
  // #swagger.summary = 'Get book by id'
  const bookId = new ObjectId(req.params.id);
  const book = await Book.findOne({ _id: bookId });
  if (book) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  } else {
    res.status(500).json({ error: 'Unable to retrieve book' });
  }
};

const createBook = async (req, res) => {
  // #swagger.tags = ['Book']
  // #swagger.summary = 'Create book'
  if (!req.body) {
    res.status(400).send({ message: "Request body cannot be empty" });
    return;
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    genre: req.body.genre,
    publishYear: req.body.publishYear
  });

  try {
    const response = await book.save();
    if (response) {
      res.status(201).json({
        response: response,
        message: "Created new book successfully.",
        book: book
      });
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the book.');
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the book.' });
    }
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

    const response = await Book.findOneAndUpdate(
      { _id: bookId},
      { $set: book },
      { new: true }
    ).exec();

    if (response) {
      res.status(204).json({
        response: response,
        message: "Updated book successfully.",
        book: book
      });
    } else {
        res.status(500).json('Some error occurred while updating the book.');
    }
  };
  
  const deleteBook = async (req, res) => {
    // #swagger.tags = ['Book']
    // #swagger.summary = 'Delete book by id'
    const bookId = new ObjectId(req.params.id);
    const response = await Book.deleteOne({ _id: bookId});
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