const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    creditHours: { type: Number, required: true }
});

module.exports = mongoose.model('Student', studentSchema);