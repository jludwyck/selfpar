import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">SelfPar</h1>
        <p className="text-xl mb-6">Master Life's Rounds</p>
        <button className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded shadow hover:bg-yellow-300">
          Shop the Scorecards
        </button>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-gray-50 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Set Your Round</h3>
            <p className="text-gray-600">Choose your 18-day timeline. Set your goals. Define your par.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Score Each Day</h3>
            <p className="text-gray-600">Mark 1 if completed, 2 if missed. Track birdies and bogeys too.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Reflect and Reset</h3>
            <p className="text-gray-600">Review your round. See your progress. Start the next one stronger.</p>
          </div>
        </div>
      </section>

      {/* Product Packs Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Shop the Scorecards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Starter Pack</h3>
            <p className="mb-4">3 Cards · Try it out · $14.99</p>
            <button className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700">
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Standard Pack</h3>
            <p className="mb-4">6 Cards · Most popular · $24.99</p>
            <button className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700">
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Annual Pack</h3>
            <p className="mb-4">20 Cards · For a full year · $69.99</p>
            <button className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
