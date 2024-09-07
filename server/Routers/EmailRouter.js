const express = require('express');
const router = express.Router();
const emailController = require('../Routers/SetupAdvertisementEmail');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/update-email-setup', upload.fields([{ name: 'file' }, { name: 'poster' }]), emailController.updateEmailSetup);
router.get('/getemailsetup/mail-setup', emailController.getEmailSetup);

module.exports = router;
