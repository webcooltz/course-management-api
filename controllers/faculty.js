// faculty controller
const ObjectId = require('mongodb').ObjectId;
const Faculty = require('../models/faculty');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
  // #swagger.tags = ['Faculty']
  // #swagger.summary = 'Get all faculty'
  const faculty = await Faculty.find();
  if (faculty) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(faculty);
  } else {
    res.status(500).json({ error: 'Unable to retrieve faculty' });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Faculty']
  // #swagger.summary = 'Get faculty by id'
  const facultyId = new ObjectId(req.params.id);
  const faculty = await Faculty.findOne({ _id: facultyId });
  if (faculty) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(faculty);
  } else {
    res.status(500).json({ error: 'Unable to retrieve faculty' });
  }
};

const createFaculty = async (req, res) => {
  // #swagger.tags = ['Faculty']
  // #swagger.summary = 'Create faculty'
  if (!req.body) {
    res.status(400).send({ message: "Request body cannot be empty" });
    return;
  }

  const faculty = new Faculty({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    email: req.body.email
  });

  try {
    const response = await faculty.save();
    if (response) {
      res.status(201).json({
        response: response,
        message: "Created new faculty successfully.",
        faculty: faculty
      });
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the faculty.');
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the faculty.' });
    }
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
    const faculty = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      email: req.body.email
    };

    const response = await Faculty.findOneAndUpdate(
      { _id: facultyId},
      { $set: faculty },
      { new: true }
    ).exec();

    if (response) {
      res.status(204).json({
        response: response,
        message: "Updated faculty successfully.",
        faculty: faculty
      });
    } else {
      res.status(500).json('Some error occurred while updating the faculty.');
    }
  };
  
  const deleteFaculty = async (req, res) => {
    // #swagger.tags = ['Faculty']
    // #swagger.summary = 'Delete faculty by id'
    const facultyId = new ObjectId(req.params.id);
    const response = await Faculty.deleteOne({ _id: facultyId});
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