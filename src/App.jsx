import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header with View Cart Button */}
      <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-800">
          SelfPar
        </Link>
        <Link
          to="/cart"
          className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          View Cart
        </Link>
      </header>

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}