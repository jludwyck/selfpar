const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body;

      console.log('📦 Stripe Checkout items:', items);

      const lineItems = items.map((item) => ({
        price: item.priceId,  // ← this is the fix
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      return res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('🔥 Stripe checkout session creation error:', error);
      return res.status(500).json({ error: 'Stripe checkout failed.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}