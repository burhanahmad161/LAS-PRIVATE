// routes/payment.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');  // Import the payment model

router.post('/save-payment', async (req, res) => {
  try {
    const { token, phone, amount, description } = req.body;

    // Create a new payment record
    const newPayment = await Payment.create({
      token,
      phone,
      email,
      amount,
      description,
      status: 'paid',  // Assuming the payment was successful
    });

    res.status(201).json({ message: 'Payment data saved successfully', payment: newPayment });
  } catch (error) {
    console.error('Error saving payment data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-payments', async (req, res) => {
    try {
      // Fetch all payments from the database
      const payments = await Payment.find();  // You can add filtering or pagination as needed
  
      res.status(200).json({
        message: 'Payments fetched successfully',
        payments: payments
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  });
  

module.exports = router;
