const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body;

      console.log('📦 Received cart items:', items);

      if (!items || !Array.isArray(items)) {
        console.error('❌ Invalid items format');
        return res.status(400).json({ error: 'Invalid items format' });
      }

      const lineItems = items.map((item) => {
        if (!item.priceId || !item.quantity) {
          console.error('❌ Missing priceId or quantity:', item);
          throw new Error('Invalid line item');
        }

        return {
          price: item.priceId,
          quantity: item.quantity,
        };
      });

      console.log('🧾 Line items to send to Stripe:', lineItems);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      console.log('✅ Checkout session created:', session.id);

      return res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('🔥 Stripe checkout session creation error:', error.message);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}