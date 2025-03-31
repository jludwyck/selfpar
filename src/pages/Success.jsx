import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-center px-6">
      <h1 className="text-3xl font-bold text-green-800 mb-4">✅ Payment Successful</h1>
      <p className="mb-6 text-gray-700">Thank you for your order. You’ll receive an email confirmation shortly.</p>
      <Link to="/" className="text-green-700 font-semibold underline">Go back to Home</Link>
    </div>
  );
}