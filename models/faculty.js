// faculty model
const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: {type: String, required: true},
    email: { type: String, required: true }
});

module.exports = mongoose.model('Faculty', facultySchema);