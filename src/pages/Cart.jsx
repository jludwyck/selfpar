import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
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
            <a href="/#shop" className="ml-6 text-green-800 underline hover:text-green-600">
              ← Continue Shopping
            </a>
          </div>
        </div>
      )}
    </div>
  );
}