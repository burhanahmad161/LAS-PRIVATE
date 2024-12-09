const express = require('express');
const multer = require('multer');
const Auction = require('../models/auctions'); // Ensure Auction model is imported
const Bid = require('../models/bid')
const { error } = require('jquery');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // folder where images are stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique file names
  },
});

const upload = multer({ storage: storage });

router.post('/request/add', upload.single('productImage'), async (req, res) => {
  try {
    // Check if the image file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const { name, startingPrice, description, duration, category } = req.body;
    const productImage = `http://localhost:3000/uploads/${req.file.filename}`;

    // Create an auction request with a pending status
    const newAuctionRequest = new Auction({
      name,
      description,
      startingPrice,
      duration,
      productImage,
      accepted: 'pending', // Mark as pending for approval
      category,
    });

    await newAuctionRequest.save();
    res.status(201).json({ message: 'Auction request submitted successfully', newAuctionRequest });
  } catch (error) {
    console.error('Error submitting auction request:', error);
    res.status(500).json({ message: 'Error submitting auction request', error });
  }
});
router.get('/request', async (req, res) => {
  try {
    const auctionRequests = await Auction.find({ accepted: 'pending' }); // Modify query as needed
    res.status(200).json(auctionRequests);
  } catch (error) {
    console.error('Error fetching auction requests:', error);
    res.status(500).json({ message: 'Error fetching auction requests', error });
  }
});


// Route to create a new auction
router.post('/add', upload.single('productImage'), async (req, res) => {
  try {
    // Validate the file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const { name, startingPrice, description, duration, category } = req.body;
    const productImage = `http://localhost:3000/uploads/${req.file.filename}`;

    const newAuction = new Auction({
      name,
      description,
      startingPrice,
      duration,
      productImage,
      accepted: 'pending',
      category,
    });

    await newAuction.save();
    res.status(201).json({ message: 'Auction created successfully', newAuction });
  } catch (error) {
    console.error('Error creating auction:', error); // Log the error
    res.status(500).json({ message: 'Error creating auction', error });
  }
});

router.post('/request', upload.single('productImage'), async (req, res) => {
  try {
    // Validate the file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const { name, startingPrice, description, duration, category } = req.body;
    const productImage = `http://localhost:3000/uploads/${req.file.filename}`;

    const newAuction = new Auction({
      name,
      description,
      startingPrice,
      duration,
      productImage,
      accepted: 'pending',
      category,
    });

    await newAuction.save();
    res.status(201).json({ message: 'Auction created successfully', newAuction });
  } catch (error) {
    console.error('Error creating auction:', error); // Log the error
    res.status(500).json({ message: 'Error creating auction', error });
  }
});

// Route to fetch all auctions
router.get('/all', async (req, res) => {
  try {
    // Fetch only auctions with status 'accepted'
    const auctions = await Auction.find({ accepted: 'accepted' }); 
    res.status(200).json(auctions);  // Send the accepted auctions back to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Error fetching auctions', error });
  }
});


// Route to delete an auction by its ID
router.delete('/:id', async (req, res) => {
  try {
    const auctionId = req.params.id;
    const deletedAuction = await Auction.findByIdAndDelete(auctionId);

    if (!deletedAuction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.status(200).json({ message: 'Auction deleted successfully', deletedAuction });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting auction', error });
  }
});

router.put('/request/:id/approve', async (req, res) => {
  const auctionId = req.params.id; // Corrected this line
  console.log(auctionId); // This will correctly log the auction ID

  try {
    // Find the auction and update its accepted status to true
    const updatedAuction = await Auction.findByIdAndUpdate(
      auctionId,
      { accepted: 'accepted' },
      { new: true }
    );
    
    if (updatedAuction) {
      res.status(200).json({ message: 'Auction approved successfully', auction: updatedAuction });
    } else {
      res.status(404).json({ message: 'Auction not found' });
    }
  } catch (error) {
    console.error('Error approving auction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/request/:id/reject', async (req, res) => {
  const auctionId = req.params.id; // Corrected this line
  console.log(auctionId); // This will correctly log the auction ID

  try {
    // Find the auction and update its accepted status to true
    const updatedAuction = await Auction.findByIdAndUpdate(
      auctionId,
      { accepted: 'rejected' },
      { new: true }
    );
    
    if (updatedAuction) {
      res.status(200).json({ message: 'Auction approved successfully', auction: updatedAuction });
    } else {
      res.status(404).json({ message: 'Auction not found' });
    }
  } catch (error) {
    console.error('Error approving auction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/:auctionId/top-bids', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Assuming bids are stored directly inside the auction document
    const topBids = auction.bids.sort((a, b) => b.amount - a.amount).slice(0, 3);

    res.status(200).json(topBids);
  } catch (error) {
    console.error('Error fetching top bids:', error); // Log error for debugging
    res.status(500).json({ message: 'Error fetching top bids', error });
  }
});

router.post('/:auctionId/bid', async (req, res) => {
  const { auctionId } = req.params;
  const { bidderName, userId, amount } = req.body;

  if (!bidderName || !userId || !amount) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found.' });
    }

    const newBid = {
      bidderName,
      userId,
      amount,
      bidTime: new Date(),
    };

    auction.bids.push(newBid);
    await auction.save();

    res.status(201).json({ message: 'Bid added successfully', auction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while adding bid.' });
  }
});

router.get('/:auctionId', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId); // Find auction by ID
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    res.status(200).json(auction); // Send the auction data back as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching auction', error });
  }
});

// Route to place a new bid
router.post('/:id/place-bid', async (req, res) => {
  try {
    const { bidderName, amount, userId } = req.body;

    // Validate bid amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Bid amount must be greater than 0' });
    }

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find the auction
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Determine the current highest bid
    const currentHighestBid = auction.bids.length > 0 ? auction.bids[0].amount : auction.startingPrice;

    // Ensure the new bid is strictly greater than the current highest bid
    if (amount <= currentHighestBid) {
      return res.status(400).json({
        message: `Bid amount must be greater than the current highest bid of ${currentHighestBid}`,
      });
    }

    // Add the new bid to the auction's bids array (including userId)
    auction.bids.push({ bidderName, amount, userId });

    // Sort the bids array in descending order (highest bid first)
    auction.bids.sort((a, b) => b.amount - a.amount);

    // Save the auction with the updated bids
    await auction.save();

    res.status(201).json({ message: 'Bid placed successfully', auction });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error placing bid', error });
  }
});


router.get('/user/bids', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using authentication middleware
    const bids = await Bid.find({ userId }).populate('auction', 'name');
    res.json(bids.map(bid => ({
      auctionName: bid.auction.name,
      amount: bid.amount
    })));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user bids', error });
  }
});


router.get('/bids/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log('Received userId in request:', userId);  // Log userId here

  try {
    const auctions = await Auction.find({ 'bids.userId': userId });

    const userBids = auctions.flatMap(auction =>
      auction.bids
        .filter(bid => bid.userId && bid.userId.toString() === userId)
        .map(bid => ({
          auctionId: auction._id,
          auctionName: auction.name,
          bidAmount: bid.amount,
          bidTime: bid.bidTime,
        }))
    );
    

    res.status(200).json(userBids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching bids.' });
  }
});





module.exports = router;
