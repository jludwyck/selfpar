import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [shipping, setShipping] = useState({ country: '', state: '', zip: '' });

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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

          {/* Shipping Estimator */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Estimate Shipping</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Country"
                className="w-full border rounded px-3 py-2 text-sm"
                value={shipping.country}
                onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                className="w-full border rounded px-3 py-2 text-sm"
                value={shipping.state}
                onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
              />
              <input
                type="text"
                placeholder="ZIP Code"
                className="w-full border rounded px-3 py-2 text-sm"
                value={shipping.zip}
                onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
              />
            </div>
          </div>

          <div className="text-right mt-8">
            <p className="text-lg font-bold">Total: ${getTotal()}</p>
            <button onClick={handleCheckout} className="mt-4 bg-green-800 text-white py-3 px-6 rounded hover:bg-green-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}