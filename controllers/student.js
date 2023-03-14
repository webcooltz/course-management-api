// student controller
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Student = require('../models/student');
// const schemaValidator = require('../util/studentValidation');

const getAll = async (req, res) => {
  // #swagger.tags = ['Student']
  // #swagger.summary = 'Get all students'
  const result = await mongodb.getDb().db().collection('students').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Student']
  // #swagger.summary = 'Get student by id'
  const studentId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('students').find({ _id: studentId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createStudent = async (req, res) => {
  // #swagger.tags = ['Student']
  // #swagger.summary = 'Create student'
  if (!req.body) {
    res.status(400).send({ message: "Request body cannot be empty" });
    return;
  }
  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    creditHours: req.body.creditHours
  });
  const schemaResponse = schemaValidator.validate(student);
  if (schemaResponse.error) {
    res.status(400).send({ message: schemaResponse.error.details[0].message });
    return;
  }
  const response = await mongodb.getDb().db().collection('students').insertOne(student);
  if (response.acknowledged) {
    res.status(201).json({
      response: response,
      message: "Created new Student successfully.",
      student: student
    });
  } else {
      res.status(500).json(response.error || 'Some error occurred while creating the student.');
  }
};
  
  const updateStudent = async (req, res) => {
    // #swagger.tags = ['Student']
    // #swagger.summary = 'Update student by id'
    if (!req.body) {
      res.status(400).send({ message: "Request body cannot be empty" });
      return;
    }
    const studentId = new ObjectId(req.params.id);
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      creditHours: req.body.creditHours
    });
    const schemaResponse = schemaValidator.validate(student);
    if (schemaResponse.error) {
      res.status(400).send({ message: schemaResponse.error.details[0].message });
      return;
    }
    const response = await mongodb
      .getDb()
      .db()
      .collection('students')
      .replaceOne({ _id: studentId }, { student });
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).json({
        response: response,
        message: "Updated student successfully.",
        student: student
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the student.');
    }
  };
  
  const deleteStudent = async (req, res) => {
    // #swagger.tags = ['Student']
    // #swagger.summary = 'Delete student by id'
    const studentId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('students').deleteOne({ _id: studentId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).json({
        response: response,
        message: "Deleted student successfully.",
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the student.');
    }
  };

module.exports = { getAll, getSingle, createStudent, updateStudent, deleteStudent };