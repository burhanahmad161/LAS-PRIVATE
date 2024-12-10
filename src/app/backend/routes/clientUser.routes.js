const express = require('express');
const router = express.Router();
const ClientUser = require('../models/clientUser'); // This is the correct model
const bcrypt = require('bcrypt'); // Don't forget to import bcrypt if it's not already imported
const jwt = require('jsonwebtoken');
// const ClientUser = require('../models/clientUser');

// const SECRET_KEY = '090078601';
const SECRET_KEY = 'my_super_secret_key'; // Must be the same in both signing and verification


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find user by email using the correct model name
//         const clientUser = await ClientUser.findOne({ email });
//         if (!clientUser) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         // Check if the password is valid
//         const isPasswordValid = await bcrypt.compare(password, clientUser.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h', algorithm: 'HS256' });


//   res.json({ token }); // Return the token

//         // Send the token in the response
//         res.status(200).json({ token, message: 'Login successful' });
//     } catch (error) {
//         console.error('Login error:', error); // Log the error details
//         res.status(500).json({ message: 'Server error' });
//     }
// });

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await ClientUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches (e.g., with bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Extract userId after validating credentials
    const userId = user._id; // assuming MongoDB and mongoose

    // Sign the token with userId
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1m', algorithm: 'HS256' });

    // Exclude sensitive fields like password from user data
    const { password: _, ...userData } = user.toObject();

    // Return the token and user data to the client
    res.json({ token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// router.post('/login', async (req, res) => { 
//     try {
//       const { email, password } = req.body;
  
//       // Find the user in the database
//       const user = await ClientUser.findOne({ email });
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Check if the password matches (e.g., with bcrypt)
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }
  
//       // Extract userId after validating credentials
//       const userId = user._id; // assuming MongoDB and mongoose
  
//       // Sign the token with userId
//       const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1m', algorithm: 'HS256' });
  
//       // Return the token to the client
//       res.json({ token });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
// });


const getUserById = async (req, res) => {
  const { userid } = req.params; // Assume you get userid from request parameters
  try {
    const user = await ClientUser.findOne({ userid }); // Find user by userid
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Respond with the user data
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
router.post('/client-users/notifications/add', async (req, res) => {
  const { firstName, auctionName, message } = req.body;

  try {
    // Find the user by their first name
    const user = await ClientUser.findOne({ firstName });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Add the message to the user's notifications array
    if (!user.notifications) {
      user.notifications = []; // Initialize if not already present
    }
    console.log(user.notifications);
    user.notifications.push(message);
    user.winningBid = auctionName
    console.log(user.notifications);
    // Save the updated user document
    await user.save();
    console.log(user.notifications);
    res.status(200).send({ message: 'Notification added successfully' });
  } catch (error) {
    console.error('Error adding notification:', error);
    res.status(500).send({ message: 'Server error' });
  }
});


// Example route setup
router.get('/api/client-users/:userid', getUserById);
// router.post('/signup', async (req, res) => {
//     const { email, password, firstName, lastName, notifications,winningBid  } = req.body;

//     try {
//       const existingUser = await ClientUser.findOne({ email }); // Use ClientUser instead of User
//       if (existingUser) return res.status(400).json({ message: 'User already exists' });

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new ClientUser({ email, password: hashedPassword, firstName, lastName, notifications, winningBid }); // Use ClientUser here
//       await newUser.save();

//       res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
// });

router.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName, notifications, winningBid } = req.body;

  try {
    const existingUser = await ClientUser.findOne({ email }); // Check if the user already exists
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new ClientUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      notifications,
      winningBid,
    });

    await newUser.save(); // Save the new user to the database

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Error creating user:", error);  // Log the actual error message to the console
    res.status(500).json({ message: 'Server error', error: error.message });  // Return the error message
  }
});


router.patch('/client-users/:userId', async (req, res) => {
  const { _id } = req.params;
  const { notificationMessage } = req.body;
  console.log(notificationMessage);
  try {
    const user = await ClientUser.findById(_id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Add new notification to user's notifications array
    user.notifications.push(notificationMessage);
    await user.save();
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



module.exports = router;
