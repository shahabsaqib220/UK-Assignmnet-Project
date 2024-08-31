// routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/RegistrationAdminModel'); // Use the existing Admin model
const validateLoginInput = require('../middlewares/validateAdminLogin');
const dotenv = require("dotenv")

const router = express.Router();



// Dotenv configuration
dotenv.config();

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post('/login', validateLoginInput, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Generate JWT
    const payload = {
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
 

    // Send the token to the client
    res.json({ token, msg: 'Login successful' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
