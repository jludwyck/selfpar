// src/components/CartDrawer.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('Arizona');
  const [zip, setZip] = useState('');
  const [estimatedShipping, setEstimatedShipping] = useState(null);

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  const handleEstimateShipping = () => {
    if (country === 'United States' && getSubtotal() >= 50) {
      setEstimatedShipping(0.0);
    } else {
      setEstimatedShipping(5.99);
    }
  };

  const progress = Math.min((getSubtotal() / 50) * 100, 100);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
      </div>

      {/* Free shipping progress bar */}
      <div className="px-4 py-2">
        <div className="text-sm text-gray-700 mb-1">Free U.S. shipping on orders $50+</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600 mt-1">${getSubtotal().toFixed(2)} / $50</div>
      </div>

      {/* Cart items */}
      <div className="overflow-y-auto h-[calc(100%-370px)] px-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 mt-4">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-4 border-b"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 hover:underline mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Estimate Shipping Section */}
      <div className="px-4 py-4 border-t bg-gray-50">
        <h4 className="text-sm font-semibold mb-2">Estimate Shipping</h4>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full mb-2 p-2 border rounded text-sm"
        >
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
        </select>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full mb-2 p-2 border rounded text-sm"
        >
          <option>Arizona</option>
          <option>California</option>
          <option>New York</option>
          <option>Texas</option>
          <option>Florida</option>
        </select>
        <input
          type="text"
          placeholder="ZIP Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-full mb-2 p-2 border rounded text-sm"
        />
        <button
          onClick={handleEstimateShipping}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 text-sm"
        >
          Estimate Shipping
        </button>
      </div>

      {/* Checkout section (now includes shipping breakdown) */}
      <div className="p-4 border-t">
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>Subtotal</span>
          <span>${getSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>Shipping</span>
          <span>
            {estimatedShipping === null ? (
              <span className="text-gray-400">—</span>
            ) : (
              `$${estimatedShipping.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between font-bold text-lg text-gray-900 mb-4">
          <span>Total</span>
          <span>${(getSubtotal() + (estimatedShipping || 0)).toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600"
        >
          View Cart / Checkout
        </button>
      </div>
    </div>
  );
}