const express = require('express');
const Contact = require('../models/contact'); // Import the Contact model

const router = express.Router();

// POST route for handling contact form submissions
router.post('/contact-req', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate the incoming data (basic checks)
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new contact entry
    const newContact = new Contact({
      name,
      email,
      message
    });

    // Save the contact form data to the database
    await newContact.save();

    // Respond with a success message
    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Error submitting contact form' });
  }
});

router.get('/contact-reqs', async (req, res) => {
    try {
      // Fetch all contact requests from the database
      const contactRequests = await Contact.find();  // Retrieves all contact requests from MongoDB
  
      // Respond with the contact requests
      res.json(contactRequests);
    } catch (error) {
      // If an error occurs, return a 500 status code with the error message
      res.status(500).json({ message: 'Error retrieving contact requests', error: error.message });
    }
  });

  router.put('/mark-as-read/:id', async (req, res) => {
    try {
      const contactId = req.params.id;
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { isRead: true },  // Set isRead to true
        { new: true }      // Return the updated document
      );
      
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact request not found' });
      }
  
      res.json(updatedContact);
    } catch (error) {
      res.status(500).json({ message: 'Error updating read status', error: error.message });
    }
  });
  

module.exports = router;
