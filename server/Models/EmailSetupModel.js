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
    type: String,
    required:false, // URL of the file in Firebase, optional
  },
});

const EmailSetup = mongoose.model('EmailSetup', emailSetupSchema);

module.exports = EmailSetup;
