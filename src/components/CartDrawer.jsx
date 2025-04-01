import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [shippingEstimated, setShippingEstimated] = useState(false);

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  const handleEstimate = () => {
    setShippingEstimated(true);
    // This would be replaced with actual shipping logic
  };

  const progress = Math.min((getTotal() / 50) * 100, 100);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
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
        <div className="text-xs text-gray-600 mt-1">${getTotal().toFixed(2)} / $50</div>
      </div>

      {/* Cart items */}
      <div className="overflow-y-auto h-[calc(100%-350px)] px-4">
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

      {/* Estimate shipping */}
      <div className="px-4 py-3 border-t">
        <h3 className="text-md font-semibold text-gray-800 mb-2">Estimate Shipping</h3>
        <div className="space-y-2">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
          >
            <option value="United States">United States</option>
          </select>

          {country === 'United States' && (
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select State</option>
              <option value="AZ">Arizona</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="WA">Washington</option>
              {/* Add more as needed */}
            </select>
          )}

          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="ZIP code"
            className="w-full border border-gray-300 rounded px-2 py-1"
          />

          <button
            onClick={handleEstimate}
            className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-500"
          >
            Estimate Shipping
          </button>

          {shippingEstimated && (
            <p className="text-sm text-gray-600">Estimated shipping: $4.99</p>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t">
        <p className="text-lg font-bold text-gray-800 mb-4">Total: ${getTotal().toFixed(2)}</p>
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
