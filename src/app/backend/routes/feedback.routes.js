const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Route to submit feedback
router.post('/submit', async (req, res) => {
  try {
    const { name, email, rating, comments } = req.body;
    const newFeedback = new Feedback({ name, email, rating, comments });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
});

// Route to get all feedback
router.get('/feedback-reqs', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
});

router.post('/submit-feedback', async (req, res) => {
  const { name, email, rating, comments } = req.body;
  
  try {
    const feedback = new Feedback({
      name,
      email,
      rating,
      comments,
    });

    await feedback.save();  // Save feedback to the database
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the feedback.' });
  }
});

router.get('/get-feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();  // Get all feedbacks from the database
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the feedbacks.' });
  }
});

module.exports = router;
