// course model
const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    subject: { type: String, required: true },
    code: { type: String, required: true },
    section: {type: String, required: true},
    description: { type: String, required: true },
    course: { type: String, required: true },
    creditHours: { type: String, required: true },
    book: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
