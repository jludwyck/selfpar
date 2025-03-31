import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white text-center">
      <h1 className="text-4xl font-bold text-green-800 mb-4">🎉 Success!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order was completed. Check your email for confirmation.
      </p>
      <Link
        to="/"
        className="bg-green-800 text-white px-6 py-3 rounded shadow hover:bg-green-700"
      >
        Back to Home
      </Link>
    </div>
  );
}