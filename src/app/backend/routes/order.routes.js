const express = require('express');
const router = express.Router();
const Order = require('../models/orders');

router.post('/create-order', async (req, res) => {
  try {
    const { winnerName, winningBid, address, auctionName, phone, status } = req.body;

    const order = new Order({
      winnerName,
      winningBid,
      address: address || '', // Use empty string if no address provided
      phone: phone || '',
      auctionName,
      status: status || 'Pending' // Default status if not provided
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      data: savedOrder
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create order',
      error: error.message
    });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders
    res.status(200).json({
      message: 'Orders fetched successfully',
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Route to get orders for a specific user (if you want to filter by userId)
router.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;  // Get the userId from the URL parameter
    const orders = await Order.find({ userId }); // Assuming orders are linked to userId
    res.status(200).json({
      message: 'Orders fetched successfully for user ' + userId,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

module.exports = router;