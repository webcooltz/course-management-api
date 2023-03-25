// student controller
const ObjectId = require('mongodb').ObjectId;
const Student = require('../models/student');

const getAll = async (req, res) => {
  // #swagger.tags = ['Student']
  // #swagger.summary = 'Get all students'
  const students = await Student.find();
  if (students) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students);
  } else {
    res.status(500).json({ error: 'Unable to retrieve students' });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Student']
  // #swagger.summary = 'Get student by id'
  const studentId = new ObjectId(req.params.id);
  const student = await Student.findOne({ _id: studentId });
  if (student) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(student);
  } else {
    res.status(500).json({ error: 'Unable to retrieve student' });
  }
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

  // const response = await mongodb.getDb().db().collection('students').insertOne(student);

  const response = await student.save();

  console.log("res (controller): ", res);

  if (response) {
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
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      creditHours: req.body.creditHours
    };

    // const response = await mongodb
    //   .getDb()
    //   .db()
    //   .collection('students')
    //   .replaceOne({ _id: studentId }, { student });

    const response = await Student.findOneAndUpdate(
      { _id: studentId},
      { $set: student },
      { new: true }
  ).exec();


    // console.log(response);
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
    // const response = await mongodb.getDb().db().collection('students').deleteOne({ _id: studentId }, true);

    const response = await Student.deleteOne({ _id: studentId});

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