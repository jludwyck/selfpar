import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">❌ Cancelled</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your checkout was cancelled. You can continue shopping below.
      </p>
      <Link
        to="/#shop"
        className="bg-green-800 text-white px-6 py-3 rounded shadow hover:bg-green-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}