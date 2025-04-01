// src/components/CartDrawer.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { countries } from '../data/countries';
import { states } from '../data/states';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [shippingCost, setShippingCost] = useState(null);

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const subtotal = getTotal();
  const total = shippingCost !== null ? subtotal + shippingCost : subtotal;
  const progress = Math.min((subtotal / 50) * 100, 100);

  const handleEstimateShipping = () => {
    const cost = subtotal >= 50 ? 0 : 5.99;
    setShippingCost(cost);
  };

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Free shipping progress */}
        <div>
          <div className="text-sm text-gray-700 mb-1">Free U.S. shipping on orders $50+</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600 mt-1">${subtotal.toFixed(2)} / $50</div>
        </div>

        {/* Cart items */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
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
                <p className="text-sm text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
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
        <div className="pt-4">
          <h4 className="font-semibold mb-2">Estimate Shipping</h4>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.code} value={c.name}>{c.name}</option>
            ))}
          </select>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="ZIP Code"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <button
            onClick={handleEstimateShipping}
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
          >
            Estimate Shipping
          </button>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="p-4 border-t bg-white">
        <p className="text-sm text-gray-700 mb-1">Subtotal: ${subtotal.toFixed(2)}</p>
        {shippingCost !== null && (
          <p className="text-sm text-gray-700 mb-1">
            Shipping: {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
          </p>
        )}
        <p className="text-lg font-bold text-gray-900 mb-4">Total: ${total.toFixed(2)}</p>
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