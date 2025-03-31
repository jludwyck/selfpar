import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty.</p>
          <Link
            to="/#shop"
            className="mt-6 inline-block bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-8">
            <p className="text-lg font-bold">Total: ${getTotal()}</p>
            <button className="mt-4 bg-green-800 text-white py-3 px-6 rounded hover:bg-green-700">
              Checkout (Coming Soon)
            </button>
            <div className="mt-4">
              <Link
                to="/#shop"
                className="text-green-700 underline hover:text-green-900"
              >
                &larr; Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}