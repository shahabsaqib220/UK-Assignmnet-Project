// middleware/validateLoginInput.js

const { check, validationResult } = require('express-validator');

const validateLoginInput = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateLoginInput;
