import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <a href="/#shop" className="text-green-700 underline hover:text-green-900">
            &larr; Continue Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => decreaseQty(item.id)} className="px-3 py-1 bg-gray-200 rounded">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                </div>
                <p className="text-gray-600 mt-2">${(item.price * item.quantity).toFixed(2)}</p>
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
          </div>

          <div className="text-left mt-6">
            <a href="/#shop" className="inline-block text-green-700 underline hover:text-green-900">
              &larr; Continue Shopping
            </a>
          </div>
        </div>
      )}
    </div>
  );
}