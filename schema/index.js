const graphql = require('graphql');
const {
    book,
    allBooks,
    addBook,
    updateBook,
    deleteBook
} = require('./books');

const {
    course,
    allCourses,
    addCourse,
    updateCourse,
    deleteCourse
} = require('./courses');

const {
    faculty,
    allFaculties,
    addFaculty,
    updateFaculty,
    deleteFaculty
} = require('./faculties');

const {
    student,
    allStudents,
    addStudent,
    updateStudent,
    deleteStudent
} = require('./students');

const { 
    GraphQLObjectType, GraphQLSchema 
} = graphql;


//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular 
//book or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book,
        allBooks,
        course,
        allCourses,
        faculty,
        allFaculties,
        student,
        allStudents
    }
});
 
//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook,
        updateBook,
        deleteBook,
        addCourse,
        updateCourse,
        deleteCourse,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        addStudent,
        updateStudent,
        deleteStudent
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});