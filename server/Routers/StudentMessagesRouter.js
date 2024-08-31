const express = require('express');
const Message = require('../Models/MessagesOfStudentModel');
const router = express.Router();

// Middleware to handle errors
const errorHandler = require('../middlewares/errorHandler');

// POST: Create a new message
router.post('/submit', async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    const newMessage = new Message({ name, email, phone, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    next(err);
  }
});

// GET: Get all messages
router.get('/all', async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
});

// DELETE: Delete all messages
router.delete('/deleteall', async (req, res, next) => {
  try {
    await Message.deleteMany({});
    res.status(200).json({ message: 'All messages deleted' });
  } catch (err) {
    next(err);
  }
});

// DELETE: Delete a specific message by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// Apply error handler middleware
router.use(errorHandler);

module.exports = router;
