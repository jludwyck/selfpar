import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center px-6">
      <h1 className="text-3xl font-bold text-red-700 mb-4">❌ Payment Canceled</h1>
      <p className="mb-6 text-gray-700">Your checkout session was canceled. You can continue shopping below.</p>
      <Link to="/" className="text-red-700 font-semibold underline">Back to Home</Link>
    </div>
  );
}