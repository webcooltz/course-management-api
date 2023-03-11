// course controller
// course controller
const mongodb = require('../db/connect');
const Course = require('../models/course');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags = ['course']
  const result = await mongodb.getDb().db().collection('courses').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['course']
  const courseId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('courses').find({ _id: courseId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createCourse = async (req, res) => {
  // #swagger.tags = ['course']
  if (!req.body) {
    res.status(400).send({ message: 'Request body cannot be empty' });
    return;
  }
  const course = new Course({
    name: req.body.name,
    subject: req.body.subject,
    code: req.body.code,
    section: req.body.section,
    description: req.body.description,
    faculty: req.body.faculty,
    creditHours: req.body.creditHours,
    books: req.body.books
  });
  const response = await mongodb.getDb().db().collection('courses').insertOne(course);
  if (response.acknowledged) {
    res.status(201).json({
      response: response,
      message: 'Created new course successfully.',
      course: course
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the course.');
  }
};

const updateCourse = async (req, res) => {
  // #swagger.tags = ['course']
  if (!req.body) {
    res.status(400).send({ message: 'Request body cannot be empty' });
    return;
  }
  const courseId = new ObjectId(req.params.id);
  const course = new Course({
    name: req.body.name,
    subject: req.body.subject,
    code: req.body.code,
    section: req.body.section,
    description: req.body.description,
    faculty: req.body.faculty,
    creditHours: req.body.creditHours,
    books: req.body.books
  });
  const response = await mongodb
    .getDb()
    .db()
    .collection('courses')
    .replaceOne({ _id: courseId }, { course });
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).json({
      response: response,
      message: 'Updated course successfully.',
      course: course
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the course.');
  }
};

const deleteCourse = async (req, res) => {
  // #swagger.tags = ['course']
  const courseId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('courses')
    .deleteOne({ _id: courseId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).json({
      response: response,
      message: 'Deleted course successfully.'
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the course.');
  }
};

module.exports = { getAll, getSingle, createCourse, updateCourse, deleteCourse };
