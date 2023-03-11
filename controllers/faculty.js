// faculty controller
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Faculty = require('../models/faculty');

const getAll = async (req, res) => {
  // #swagger.tags = ['Faculty']
  // #swagger.summary = 'Get all faculty'
  const result = await mongodb.getDb().db().collection('faculty').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Faculty']
  // #swagger.summary = 'Get faculty by id'
  const facultyId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('faculty').find({ _id: facultyId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createFaculty = async (req, res) => {
  // #swagger.tags = ['Faculty']
  // #swagger.summary = 'Create faculty'
  if (!req.body) {
    res.status(400).send({ message: "Request body cannot be empty" });
    return;
  }
  const faculty = new Faculty ({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    email: req.body.email
  });
  const response = await mongodb.getDb().db().collection('faculty').insertOne(faculty);
  if (response.acknowledged) {
    res.status(201).json({
      response: response,
      message: "Created new Faculty successfully.",
      faculty: faculty
    });
  } else {
      res.status(500).json(response.error || 'Some error occurred while creating the faculty.');
  }
};
  
  const updateFaculty = async (req, res) => {
    // #swagger.tags = ['Faculty']
      // #swagger.summary = 'Update faculty by id'
    if (!req.body) {
      res.status(400).send({ message: "Request body cannot be empty" });
      return;
    }
    const facultyId = new ObjectId(req.params.id);
    const faculty = new Faculty ({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      email: req.body.email
    });
    const response = await mongodb
      .getDb()
      .db()
      .collection('faculty')
      .replaceOne({ _id: facultyId }, { faculty });
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).json({
        response: response,
        message: "Updated faculty successfully.",
        faculty: faculty
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the faculty.');
    }
  };
  
  const deleteFaculty = async (req, res) => {
    // #swagger.tags = ['Faculty']
      // #swagger.summary = 'Delete faculty by id'
    const facultyId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('faculty').deleteOne({ _id: facultyId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).json({
        response: response,
        message: "Deleted faculty successfully.",
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the faculty.');
    }
  };

module.exports = { getAll, getSingle, createFaculty, updateFaculty, deleteFaculty };