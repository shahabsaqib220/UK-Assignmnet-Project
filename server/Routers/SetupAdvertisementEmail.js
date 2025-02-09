const EmailSetup = require('../Models/EmailSetupModel');
const multer = require('multer');
const orders = require("../Models/orderCreationModel");
const registerstudentemails = require("../Models/RegisterStudentEmailModel");
const { transporter } = require('../utils/emailService');
const { bucket } = require('../Configurations/firebase');
const path = require('path');
const connectDB = require('../db');

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

connectDB();

// Function to upload a file to Firebase
const uploadFileToFirebase = (file, folder) => {
  return new Promise((resolve, reject) => {
    const filename = `${folder}/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(filename);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (err) => {
      console.error(`${folder} stream error:`, err);
      reject(new Error(`Failed to upload ${folder} to Firebase`));
    });

    blobStream.on('finish', async () => {
      try {
        await fileUpload.makePublic();
        const fileURL = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        resolve({ fileURL, filename: file.originalname });
      } catch (error) {
        console.error(`Error making ${folder} public:`, error);
        reject(new Error(`Failed to make ${folder} public`));
      }
    });

    blobStream.end(file.buffer);
  });
};

// Route to update email setup
exports.updateEmailSetup = async (req, res) => {
  try {
    const { text, subject } = req.body;
    const file = req.files?.file?.[0];
    const poster = req.files?.poster?.[0];

    let emailSetup = await EmailSetup.findOne();
    if (!emailSetup) {
      emailSetup = new EmailSetup();
    }

    emailSetup.text = text;
    emailSetup.subject = subject;

    const fileUploadPromise = file ? uploadFileToFirebase(file, 'email') : Promise.resolve(null);
    const posterUploadPromise = poster ? uploadFileToFirebase(poster, 'poster') : Promise.resolve(null);

    const [fileResult, posterResult] = await Promise.all([fileUploadPromise, posterUploadPromise]);

    if (fileResult) {
      emailSetup.filePath = fileResult.fileURL;
      emailSetup.fileName = fileResult.filename;
    }
    if (posterResult) {
      emailSetup.poster = posterResult.fileURL;
      emailSetup.posterName = posterResult.filename;
    }

    await emailSetup.save();
    return res.json(emailSetup);
  } catch (err) {
    console.error('Error updating email setup:', err);
    return res.status(500).json({ error: 'Failed to update email setup' });
  }
};

// Route to get the current email setup dynamically
exports.getEmailSetup = async (req, res) => {
  try {
    const emailSetup = await EmailSetup.findOne();
    if (!emailSetup) {
      return res.status(404).json({ error: 'Email setup not found' });
    }

    // Return the email setup with dynamic filenames if they exist
    const result = {
      text: emailSetup.text,
      subject: emailSetup.subject,
      poster: emailSetup.poster,
      posterName: emailSetup.posterName || 'No poster uploaded',
      filePath: emailSetup.filePath,
      fileName: emailSetup.fileName || 'No file uploaded',
    };

    res.json(result);
  } catch (err) {
    console.error('Error retrieving email setup:', err);
    return res.status(500).json({ error: 'Failed to retrieve email setup' });
  }
};

// Schedule the function to send advertisement emails
exports.sendAdvertisementEmail = async () => {
  try {
    const emailSetup = await EmailSetup.findOne();
    if (!emailSetup) return res.status(404).send('No email setup found');

    const orderEmails = await orders.find().select('email -_id');
    const registeredEmails = await registerstudentemails.find().select('email -_id');

    const allEmails = [...orderEmails.map((doc) => doc.email), ...registeredEmails.map((doc) => doc.email)];
    const uniqueEmails = [...new Set(allEmails)];

    if (uniqueEmails.length === 0) return res.status(204).send('No emails to send to');

    const mailOptions = {
      from: `"AssignmentAsk3" <${process.env.GMAIL}>`,
      to: uniqueEmails,
      subject: emailSetup.subject || 'Advertisement Email!',
      html: `
        <div style="background-color: #f5f5f5; padding: 20px;">
          <h2>${emailSetup.subject}</h2>
          ${emailSetup.poster ? `<img src="${emailSetup.poster}" alt="Poster" style="max-width: 100%;">` : ''}
          <p>${emailSetup.text}</p>
        </div>`,
      attachments: emailSetup.filePath ? [{
        filename: emailSetup.fileName,
        path: emailSetup.filePath,
      }] : [],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).send('Failed to send email');
      }
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    });
  } catch (err) {
    console.error('Failed to send advertisement email:', err);
    return res.status(500).send('Error sending advertisement email');
  }
};


