// src/pages/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { countries } from '../data/countries';
import { states } from '../data/states';

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [shippingCost, setShippingCost] = useState(null);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = shippingCost !== null ? subtotal + shippingCost : subtotal;

  const handleEstimateShipping = () => {
    const cost = subtotal >= 50 ? 0 : 5.99;
    setShippingCost(cost);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong with checkout.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed.');
    }
  };

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">
          Your cart is empty. <Link to="/#shop" className="text-green-700 underline">Continue Shopping</Link>
        </p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <div className="flex items-center space-x-2 mt-2">
                  <button onClick={() => decreaseQuantity(item.id)} className="px-2 bg-gray-300 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="px-2 bg-gray-300 rounded">+</button>
                </div>
                <p className="text-gray-600 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Remove</button>
            </div>
          ))}

          {/* Estimate Shipping */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Estimate Shipping</h3>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2 text-sm"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>{c.name}</option>
              ))}
            </select>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2 text-sm"
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="ZIP Code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2 text-sm"
            />
            <button
              onClick={handleEstimateShipping}
              className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
            >
              Estimate Shipping
            </button>
          </div>

          {/* Totals */}
          <div className="text-right mt-8">
            <p className="text-lg font-medium">Subtotal: ${subtotal.toFixed(2)}</p>
            {shippingCost !== null && (
              <p className="text-lg font-medium">
                Shipping: {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </p>
            )}
            <p className="text-xl font-bold mt-2">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-800 text-white py-3 px-6 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}