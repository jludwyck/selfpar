import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useCart();

  const increaseQuantity = (item) => {
    addToCart(item);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      removeFromCart(item.id);
      for (let i = 0; i < item.quantity - 1; i++) {
        addToCart(item);
      }
    }
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
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
                    onClick={() => decreaseQuantity(item)}
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                  >
                    −
                  </button>
                  <span className="text-gray-800 font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
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
          </div>
        </div>
      )}
    </div>
  );
}