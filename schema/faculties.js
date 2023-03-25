const graphql = require('graphql');
const Faculty = require('../models/faculty');
const ObjectId = require('mongodb').ObjectId;

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt, GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const FacultyType = new GraphQLObjectType({
    name: 'Faculty',
    fields: () => ({
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        bio: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const faculty = {
    type: FacultyType,
    args: { _id: { type: GraphQLID} },
    resolve(parent, args) {
        return Faculty.findById(ObjectId(args._id));
    }
};

const allFaculties = {
    type: new GraphQLList(FacultyType),
    resolve(parent, args) {
        return Faculty.find({});
    }
};

const addFaculty = {
    type: FacultyType,
    args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        bio: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        let faculty = new Faculty({
            firstName: args.firstName,
            lastName: args.lastName,
            bio: args.bio,
            email: args.email
        })

        return faculty.save().catch(Error.message);
    }
};

const updateFaculty = {
    type: FacultyType,
    args: {
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        bio: { type: GraphQLString },
        email: { type: GraphQLString }
    },
    resolve(parent, args) {
        let faculty = {
            firstName: args.firstName,
            lastName: args.lastName,
            bio: args.bio,
            email: args.email
        }

        return Faculty.findByIdAndUpdate(
            ObjectId(args._id),
            { $set: faculty },
            { new: true }
        );
    }
};

const deleteFaculty = {
    type:FacultyType,
        args: {
            _id: { type: GraphQLID }
        },
        resolve(parent,args) {
            return Faculty.findByIdAndDelete(ObjectId(args._id));
        }
}

module.exports = {
    faculty,
    allFaculties,
    addFaculty,
    updateFaculty,
    deleteFaculty
}