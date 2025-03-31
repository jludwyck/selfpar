import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Success() {
  const { cartItems, clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Clear cart after successful checkout
    clearCart();

    // Fetch or simulate the order details (usually from Stripe, but for now, using cartItems)
    setOrderDetails(cartItems);
  }, [clearCart, cartItems]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-4 py-16">
      <h1 className="text-4xl font-bold text-green-800 mb-6">🎉 Order Confirmed!</h1>
      <p className="text-lg text-gray-700 mb-8">Thank you for your purchase. Your order has been successfully processed!</p>

      <div className="w-full max-w-2xl bg-gray-100 p-6 rounded shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>

        {orderDetails && orderDetails.length > 0 ? (
          <div className="space-y-4">
            {orderDetails.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2 mb-2">
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-gray-600">
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-xl">
              <span>Total</span>
              <span>${getTotalPrice()}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No order details available</p>
        )}
      </div>

      <Link
        to="/"
        className="bg-green-800 text-white py-3 px-6 rounded shadow hover:bg-green-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
}