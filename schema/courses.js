const graphql = require('graphql');
const Course = require('../models/course');
const ObjectId = require('mongodb').ObjectId;

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt, GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const CourseType = new GraphQLObjectType({
    name: 'Course',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error AuthorType not 
    //found if not wrapped in a function
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        subject: { type: GraphQLString },
        code: { type: GraphQLString },
        section: { type: GraphQLString },
        description: { type: GraphQLString },
        faculty: { type: GraphQLString },
        creditHours: { type: GraphQLInt },
        books: { type: GraphQLString }
    })
});

const course = {
        type: CourseType,
        //argument passed by the user while making the query
        args: { _id: { type: GraphQLID } },
        resolve(parent, args) {
            //Here we define how to get data from database source

            //this will return the course with id passed in argument 
            //by the user
            return Course.findById(ObjectId(args._id));
        }
    };
const allCourses = {
        type: new GraphQLList(CourseType),
        resolve(parent, args) {
            return Course.find({});
        }
    }

const addCourse = {
        type: CourseType,
        args:{
            name: { type: new GraphQLNonNull(GraphQLString)},
            subject: { type: new GraphQLNonNull(GraphQLString)},
            code: { type: new GraphQLNonNull(GraphQLString)},
            section: { type: new GraphQLNonNull(GraphQLString)},
            description: { type: new GraphQLNonNull(GraphQLString)},
            faculty: { type: new GraphQLNonNull(GraphQLString)},
            creditHours: { type: new GraphQLNonNull(GraphQLInt)},
            books: { type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parent,args){
            let course = new Course({
                name: args.name,
                subject: args.subject,
                code: args.code,
                section: args.section,
                description: args.description,
                faculty: args.faculty,
                creditHours: args.creditHours,
                books: args.books
            })
            return course.save()
        }
    }

const updateCourse = {
        type:CourseType,
        args: {
            _id: { type: GraphQLID },
        name: { type: GraphQLString },
        subject: { type: GraphQLString },
        code: { type: GraphQLString },
        section: { type: GraphQLString },
        description: { type: GraphQLString },
        faculty: { type: GraphQLString },
        creditHours: { type: GraphQLInt },
        books: { type: GraphQLString }
        },
        resolve(parent,args) {
            let course = {
                name: args.name,
                subject: args.subject,
                code: args.code,
                section: args.section,
                description: args.description,
                faculty: args.faculty,
                creditHours: args.creditHours,
                books: args.books
            };
            
            return Course.findByIdAndUpdate(
                ObjectId(args._id),
                { $set: course },
                { new: true }
            )
        }
    }

const deleteCourse = {
        type:CourseType,
        args: {
            _id: { type: GraphQLID}
        },
        resolve(parent,args) {
            return Course.findByIdAndDelete(ObjectId(args._id));
        }
    }


module.exports = {
    course,
    allCourses,
    addCourse,
    updateCourse,
    deleteCourse
}