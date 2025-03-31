// api/create-checkout-session.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body; // The items passed from the frontend (cart data)
      
      const lineItems = items.map(item => ({
        price: item.priceId, // The Price ID from Stripe
        quantity: item.quantity,
      }));

      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`, // Redirect after success
        cancel_url: `${req.headers.origin}/cancel`, // Redirect on cancel
      });

      res.status(200).json({ url: session.url }); // Send back the URL for the checkout page
    } catch (err) {
      console.error('Error creating checkout session:', err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}