const mongoose = require('mongoose');

const registerStudentEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // This ensures no duplicate emails within this collection
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('RegisterStudentEmail', registerStudentEmailSchema);
