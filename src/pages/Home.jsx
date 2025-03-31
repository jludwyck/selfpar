import { useCart } from '../context/CartContext';
import React from 'react';

export default function Home() {
  const { addToCart } = useCart();

  const starter = { id: 'starter', name: 'Starter Pack', price: 14.99 };
  const standard = { id: 'standard', name: 'Standard Pack', price: 24.99 };
  const annual = { id: 'annual', name: 'Annual Pack', price: 69.99 };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 relative">
      {/* Version Tag */}
      <div className="absolute top-4 w-full text-center text-sm text-gray-500 z-50">
        v1.0.0
      </div>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white py-32 px-6 text-center"
        style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
      >
        <h1 className="text-5xl font-bold mb-4 drop-shadow">SelfPar</h1>
        <p className="text-xl mb-6 drop-shadow">Master Life's Rounds</p>
        <button className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded shadow hover:bg-yellow-300">
          Shop the Scorecards
        </button>
      </section>

      {/* ... (rest of your sections stay exactly the same) */}
    </div>
  );
}