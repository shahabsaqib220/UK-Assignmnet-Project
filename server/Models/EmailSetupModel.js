const mongoose = require('mongoose');

const emailSetupSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  filePath: {
    type: String, // URL of the file in Firebase
    required: false,
  },
  poster: {
    type: String, // URL or path to the poster image
    required: false,
  },
});

const EmailSetup = mongoose.model('EmailSetup', emailSetupSchema);

module.exports = EmailSetup;
