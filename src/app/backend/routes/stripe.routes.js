const express = require('express');
const stripe = require('stripe')('sk_test_51QTW9CDiqcrh4bWVfxnwgMUj4We9MGO3gdM1EDIibpw9ZgaWs4edEBEm0y89dg4ooO95oCsB9m2AKelJYFIbP2N400PmImUXh2'); // Use your own Stripe secret key
// const app = express();
const router = express.Router();

// app.use(express.json());

router.post('/api/create-checkout-session', async (req, res) => {
  const { phone, address, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // Replace with the currency you want
            product_data: {
              name: 'Order for ' + phone, // Product name (could be more descriptive)
              description: `Order from ${address}`,
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Stripe session');
  }
});

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });


module.exports = router;