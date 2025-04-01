// src/components/CartDrawer.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [shippingCost, setShippingCost] = useState(null);

  const getTotal = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  const progress = Math.min((getTotal() / 50) * 100, 100);

  const handleEstimateShipping = () => {
    const subtotal = getTotal();
    if (country === 'United States' && subtotal >= 50) {
      setShippingCost(0);
    } else {
      setShippingCost(5.99);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div className="text-sm text-gray-700 mb-1">Free U.S. shipping on orders $50+</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600 mt-1">${getTotal().toFixed(2)} / $50</div>
      </div>

      {/* Cart Items */}
      <div className="overflow-y-auto max-h-[calc(100%-290px)] px-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 mt-4">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-4 border-b">
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

        {/* Estimate Shipping Section */}
        <div className="bg-gray-50 p-4 mt-6 rounded shadow">
          <h4 className="font-bold mb-2">Estimate Shipping</h4>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          >
            <option>United States</option>
          </select>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          >
            <option value="">Select State</option>
            <option>Arizona</option>
            <option>California</option>
            <option>Texas</option>
            <option>New York</option>
            <option>Florida</option>
            {/* Add more states as needed */}
          </select>
          <input
            type="text"
            placeholder="ZIP Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          />
          <button
            onClick={handleEstimateShipping}
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
          >
            Estimate Shipping
          </button>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="p-4 border-t bg-white">
        <p className="text-sm mb-1">Subtotal: ${getTotal().toFixed(2)}</p>
        {shippingCost !== null && (
          <p className="text-sm mb-1">
            Shipping: {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
          </p>
        )}
        <p className="text-xl font-bold mb-4">
          Total: ${(getTotal() + (shippingCost || 0)).toFixed(2)}
        </p>
        <button
          onClick={handleCheckout}
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-600 text-lg font-semibold"
        >
          View Cart / Checkout
        </button>
      </div>
    </div>
  );
}
