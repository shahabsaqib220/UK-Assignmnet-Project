const express = require('express');
const { check, validationResult } = require('express-validator');
const Admin = require('../Models/RegistrationAdminModel');
const bcrypt = require('bcryptjs');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register admin
// @access  Public
router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  check('confirmPassword', 'Confirm Password is required').not().isEmpty(),
], async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    // Create new admin
    admin = new Admin({
      name,
      email,
      password,
    });

    await admin.save();
    res.json({ msg: 'Admin registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
