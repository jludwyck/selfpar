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

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  const handleEstimate = () => {
    if (country && state && zip) {
      const subtotal = getTotal();
      const estimated = subtotal >= 50 ? 0 : 5.99;
      setShippingCost(estimated);
    }
  };

  const progress = Math.min((getTotal() / 50) * 100, 100);

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

      {/* Scrollable section */}
      <div className="overflow-y-auto h-[calc(100%-200px)] px-4 pb-4">
        {/* Free Shipping Progress */}
        <div className="py-2">
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

        {/* Estimate Shipping */}
        <div className="mt-6">
          <h4 className="font-bold text-sm mb-2">Estimate Shipping</h4>
          <select
            className="w-full mb-2 p-2 border rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
          </select>
          <select
            className="w-full mb-2 p-2 border rounded"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="Arizona">Arizona</option>
            <option value="California">California</option>
            <option value="New York">New York</option>
            {/* Add more states if needed */}
          </select>
          <input
            type="text"
            className="w-full mb-2 p-2 border rounded"
            placeholder="ZIP Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <button
            onClick={handleEstimate}
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
          >
            Estimate Shipping
          </button>
        </div>
      </div>

      {/* Bottom Totals Section */}
      <div className="p-4 border-t">
        <p className="text-sm text-gray-600 mb-1">Subtotal: ${getTotal().toFixed(2)}</p>
        {shippingCost !== null && (
          <p className="text-sm text-gray-600 mb-1">
            Shipping: {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
          </p>
        )}
        <p className="text-lg font-bold text-gray-800 mt-2">
          Total: ${(getTotal() + (shippingCost || 0)).toFixed(2)}
        </p>
        <button
          onClick={handleCheckout}
          className="w-full mt-4 bg-green-700 text-white py-2 rounded hover:bg-green-600"
        >
          View Cart / Checkout
        </button>
      </div>
    </div>
  );
}
