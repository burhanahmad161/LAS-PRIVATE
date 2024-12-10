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

// // Route to get orders for a specific user (if you want to filter by userId)
// router.get('/orders/:userName', async (req, res) => {
//   try {
//     const userId = req.params.user;  // Get the userId from the URL parameter
//     const orders = await Order.find({ userName }); // Assuming orders are linked to userId
//     res.status(200).json({
//       message: 'Orders fetched successfully for user ' + userId,
//       data: orders
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Failed to fetch orders',
//       error: error.message
//     });
//   }
// });

// Route to get orders for a specific winnerName
// router.get('/orders/:winnerName', async (req, res) => {
//   try {
//     const winnerName = req.params.winnerName;  // Get the winnerName from the URL parameter
//     const orders = await Order.find({ winnerName }); // Find orders linked to winnerName
//     res.status(200).json({
//       message: 'Orders fetched successfully for winner ' + winnerName,
//       data: orders
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Failed to fetch orders',
//       error: error.message
//     });
//   }
// });

// Route to get orders for a specific user (winnerName)
router.get('/:winnerName', async (req, res) => {
  try {
    const winnerName = req.params.winnerName;  // Get the winnerName from the URL
    const orders = await Order.find({ winnerName }); // Find orders linked to winnerName
    res.status(200).json({
      message: 'Orders fetched successfully for winner ' + winnerName,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});


// Route to get orders for a specific user (assuming userName is being used to identify the user)
// router.get('/orders/:userName', async (req, res) => {
//   try {
//     const userName = req.params.firstName;  // Get the userName from the URL parameter
//     const orders = await Order.find({ winnerName: userName });  // Find orders by winnerName or userName

//     // Send orders with winnerName and firstName if necessary
//     res.status(200).json({
//       message: 'Orders fetched successfully for user ' + firstName,
//       data: orders.map(order => ({
//         ...order.toObject(),
//         firstName: order.firstName // Add firstName if it's part of the order
//       })),
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Failed to fetch orders',
//       error: error.message,
//     });
//   }
// });


module.exports = router;