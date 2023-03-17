// course controller
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Course = require('../models/course');


const getAll = async (req, res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Get all courses'
    try {

        // const result = await mongodb.getDb().db().collection('courses').find().toArray();

        const result = await Course.find().exec();

        // console.log(result);
        if (result) {
            res.status(200).json(result);
        } else {
            throw { status: 400, message: "No courses found." };
        }
    } catch (err) {
        res.status(err.status || 400).json(
            { message: err.message } || "An error ocurred while locating courses."
        );
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Get course by id'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw {
                status: 400,
                message: "Invalid id. Please use a vaild id.",
            };
        }

        const filter = {
            _id: new ObjectId(req.params.id),
        };

        // const result = await mongodb.getDb().db().collection('courses').find(filter).toArray();

        const result = await Course.findOne(filter);

        if (result) {
            res.status(200).json(result);
        } else {
            throw {
                status: 400,
                message: "Id not found. Please use a valid id.",
            };
        }
        // console.log(result);
    } catch (err) {
        res.status(err.status || 400).json(
            { message: err.message } ||
                "An error ocurred while locating a course."
        );
    }
};

const createCourse = async (req, res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Create course'
    try {
        // const Course = req.body;

        const course = new Course ({
            name: req.body.name,
            subject: req.body.subject,
            code: req.body.code,
            section: req.body.section,
            description: req.body.description,
            faculty: req.body.faculty,
            creditHours: req.body.creditHours,
            books: req.body.books,
        });

        // const result = await mongodb.getDb().db().collection('courses').insertOne(course);

        const result = await course.save();

        // console.log(result);
        if (result) {
            res.status(201).json(result._id);
        } else {
            throw {
                status: 400,
                message:
                    "An error ocurred while creating a course. Please review all required fields.",
            };
        }
    } catch (err) {
        res.status(err.status || 500).json(
            { message: err.message } ||
                "An error occured while creating a course."
        );
    }
};

const updateCourse = async (req, res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Update course by id'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw {
                status: 400,
                message: "Invalid id. Please use a vaild id.",
            };
        }

        const filter = {
            _id: new ObjectId(req.params.id),
        };

        const course = {
            name: req.body.name,
            subject: req.body.subject,
            code: req.body.code,
            section: req.body.section,
            description: req.body.description,
            faculty: req.body.faculty,
            creditHours: req.body.creditHours,
            books: req.body.books,
        };

        // const result = await mongodb.getDb().db().collection('courses').replaceOne(filter, course);

        const result = await Course.findOneAndUpdate(
            filter,
            { $set: course },
            { new: true }
        ).exec();

        // console.log(result);
        if (result) {
            res.status(204).send(result);
        } else {
            throw {
                status: 400,
                message: "Id not found. Please use a valid id.",
            };
        }
    } catch (err) {
        res.status(err.status || 500).json(
            { message: err.message } ||
                "An error occured while updating a course."
        );
    }
};

const deleteCourse = async (req, res) => {
    // #swagger.tags = ['Course']
    // #swagger.summary = 'Delete course by id'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw {
                status: 400,
                message: "Invalid id. Please use a vaild id.",
            };
        }

        const filter = {
            _id: new ObjectId(req.params.id),
        };

        // const result = await mongodb.getDb().db().collection('courses').removeOne(filter);

        const result = await Course.deleteOne(filter);

        if (result.deletedCount > 0) {
            res.status(200).send();
        } else {
            throw {
                status: 400,
                message: "Id not found. Please use a valid id.",
            };
        }
    } catch (err) {
        // console.log(err);
        res.status(err.status || 500).json(
            { message: err.message } ||
                "An error occured while deleting a course."
        );
    }
};

module.exports = {
    getAll,
    getSingle,
    updateCourse,
    createCourse,
    deleteCourse,
};
