import { useCart } from '../context/CartContext';
import React from 'react';



export default function Home() {
  const { addToCart } = useCart();

const starter = { id: 'starter', name: 'Starter Pack', price: 14.99 };
const standard = { id: 'standard', name: 'Standard Pack', price: 24.99 };
const annual = { id: 'annual', name: 'Annual Pack', price: 69.99 };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
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

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-gray-50 rounded shadow">
            <img
              src="/images/set-your-round.jpg"
              alt="Set Your Round"
              className="mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2">Set Your Round</h3>
            <p className="text-gray-600">Choose your 18-day timeline. Set your goals. Define your par.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow">
            <img
              src="/images/score-each-day.jpg"
              alt="Score Each Day"
              className="mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2">Score Each Day</h3>
            <p className="text-gray-600">Mark 1 if completed, 2 if missed. Track birdies and bogeys too.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow">
            <img
              src="/images/reflect-and-reset.jpg"
              alt="Reflect and Reset"
              className="mb-4 rounded"
            />
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
            <button
              onClick={() => addToCart(starter)}
              className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Standard Pack</h3>
            <p className="mb-4">6 Cards · Most popular · $24.99</p>
            <button
              onClick={() => addToCart(standard)}
              className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Annual Pack</h3>
            <p className="mb-4">20 Cards · For a full year · $69.99</p>
            <button
              onClick={() => addToCart(annual)}
              className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">What People Are Saying</h2>
        <blockquote className="max-w-xl mx-auto italic text-gray-600">
          “This is the only habit tracker I've ever actually stuck with. It’s like having a personal caddy for your life.”
          <footer className="mt-4 font-semibold text-gray-800">— A Real SelfPar User</footer>
        </blockquote>
      </section>

      {/* Why It Works Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Why SelfPar Works</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          It’s paper on purpose. Designed to feel intentional. No batteries. No notifications. Just better habits.
        </p>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-green-800 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to master your next round?</h2>
        <button className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded shadow hover:bg-yellow-300">
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} SelfPar. All rights reserved.</p>
      </footer>
    </div>
  );
}
