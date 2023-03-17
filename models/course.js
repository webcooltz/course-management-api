// course model
const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    code: { type: String, required: true },
    section: {type: String, required: true},
    description: { type: String, required: true },
    faculty: { type: String, required: true },
    creditHours: { type: Number, required: true },
    books: { type: String, required: true }
},
{
    collection: "courses"
});

module.exports = mongoose.model('Course', courseSchema);
