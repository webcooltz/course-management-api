const graphql = require('graphql');
const Book = require('../models/book');
const ObjectId = require('mongodb').ObjectId;

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt, GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error AuthorType not 
    //found if not wrapped in a function
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString  },
        author: { type: GraphQLString }, 
        pages: { type: GraphQLString },
        genre: { type: GraphQLString },
        publishYear: { type: GraphQLString }
    })
});

const book = {
        type: BookType,
        //argument passed by the user while making the query
        args: { _id: { type: GraphQLID } },
        resolve(parent, args) {
            //Here we define how to get data from database source

            //this will return the book with id passed in argument 
            //by the user
            return Book.findById(ObjectId(args._id));
        }
    };
const allBooks = {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return Book.find({});
        }
    }

const addBook = {
        type:BookType,
        args:{
            title: { type: new GraphQLNonNull(GraphQLString)},
            author: { type: new GraphQLNonNull(GraphQLString)},
            pages: { type: new GraphQLNonNull(GraphQLString)},
            genre: { type: new GraphQLNonNull(GraphQLString)},
            publishYear: { type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parent,args){
            let book = new Book({
                title: args.title,
                author: args.author,
                pages: args.pages,
                genre: args.genre,
                publishYear: args.publishYear
            })
            return book.save()
        }
    }

const updateBook = {
        type:BookType,
        args: {
            _id: { type: GraphQLID },
            title: { type: GraphQLString},
            author: { type: GraphQLString},
            pages: { type: GraphQLString},
            genre: { type: GraphQLString},
            publishYear: { type: GraphQLString}
        },
        resolve(parent,args) {
            let book = {
                title: args.title,
                author: args.author,
                pages: args.pages,
                genre: args.genre,
                publishYear: args.publishYear
            };
            
            return Book.findByIdAndUpdate(
                ObjectId(args._id),
                { $set: book },
                { new: true }
            )
        }
    }

const deleteBook = {
        type:BookType,
        args: {
            _id: { type: GraphQLID}
        },
        resolve(parent,args) {
            return Book.findByIdAndDelete(ObjectId(args._id));
        }
    }


module.exports = {
    book,
    allBooks,
    addBook,
    updateBook,
    deleteBook
}