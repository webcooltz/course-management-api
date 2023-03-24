const graphql = require('graphql');
const Student = require('../models/student');
const ObjectId = require('mongodb').ObjectId;

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt, GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        creditHours: { type: GraphQLInt }
    })
});

const student = {
    type: StudentType,
    args: { _id: { type: GraphQLID} },
    resolve(parent, args) {
        return Student.findById(ObjectId(args._id));
    }
};

const allStudents = {
    type: new GraphQLList(StudentType),
    resolve(parent, args) {
        return Student.find({});
    }
};

const addStudent = {
    type: StudentType,
    args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        creditHours: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args) {
        let student = new Student({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            creditHours: args.creditHours
        })

        return student.save();
    }
};

const updateStudent = {
    type: StudentType,
    args: {
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        creditHours: { type: GraphQLInt }
    },
    resolve(parent, args) {
        let student = {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            creditHours: args.creditHours
        }

        return Student.findByIdAndUpdate(
            ObjectId(args._id),
            { $set: student },
            { new: true }
        );
    }
};

const deleteStudent = {
    type: StudentType,
        args: {
            _id: { type: GraphQLID }
        },
        resolve(parent,args) {
            return Student.findByIdAndDelete(ObjectId(args._id));
        }
}

module.exports = {
    student,
    allStudents,
    addStudent,
    updateStudent,
    deleteStudent
}