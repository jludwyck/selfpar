// src/pages/Home.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useDrawer } from '../context/DrawerContext';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const { addToCart, cartItems } = useCart();
  const { openDrawer } = useDrawer();

  const starter = {
    id: 'starter',
    name: 'Starter Pack',
    price: 14.99,
    priceId: 'price_1R8cmbL2lJunKSvx864trGh6',
  };
  const standard = {
    id: 'standard',
    name: 'Standard Pack',
    price: 24.99,
    priceId: 'price_1R8cn2L2lJunKSvxBr9U1AGo',
  };
  const annual = {
    id: 'annual',
    name: 'Annual Pack',
    price: 69.99,
    priceId: 'price_1R8cnML2lJunKSvxBEbEy8Jg',
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (item) => {
    addToCart(item);
    openDrawer();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold text-green-800">SelfPar</Link>
        <nav className="hidden md:flex space-x-6">
          <a href="#shop" className="text-gray-700 hover:text-green-800 font-medium">Shop</a>
          <a href="#how" className="text-gray-700 hover:text-green-800 font-medium">How It Works</a>
          <a href="#why" className="text-gray-700 hover:text-green-800 font-medium">Why It Works</a>
        </nav>
        <button onClick={openDrawer} className="relative">
          <ShoppingCart className="w-6 h-6 text-green-800" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Hero */}
      <section
        className="bg-cover bg-center text-white py-32 px-6 text-center"
        style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
      >
        <h1 className="text-5xl font-bold mb-4 drop-shadow">SelfPar</h1>
        <p className="text-xl mb-6 drop-shadow">Master Life's Rounds</p>
        <a href="#shop">
          <button className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded shadow hover:bg-yellow-300">
            Shop the Scorecards
          </button>
        </a>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-gray-50 rounded shadow">
            <img src="/images/set-your-round.jpg" alt="Set Your Round" className="mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Set Your Round</h3>
            <p className="text-gray-600">Choose your 18-day timeline. Set your goals. Define your par.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow">
            <img src="/images/score-each-day.jpg" alt="Score Each Day" className="mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Score Each Day</h3>
            <p className="text-gray-600">Mark 1 if completed, 2 if missed. Track birdies and bogeys too.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow">
            <img src="/images/reflect-and-reset.jpg" alt="Reflect and Reset" className="mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">Reflect and Reset</h3>
            <p className="text-gray-600">Review your round. See your progress. Start the next one stronger.</p>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Shop the Scorecards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[starter, standard, annual].map((pack) => (
            <div key={pack.id} className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">{pack.name}</h3>
              <p className="mb-4">
                {pack.id === 'starter' && '3 Cards · Try it out · $14.99'}
                {pack.id === 'standard' && '6 Cards · Most popular · $24.99'}
                {pack.id === 'annual' && '20 Cards · For a full year · $69.99'}
              </p>
              <button
                onClick={() => handleAddToCart(pack)}
                className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {/* Testimonials */}
      <section className="relative py-20 px-6 text-center text-white bg-[#181818] overflow-hidden">
        {/* Topo Image Overlay */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: "url('/images/gold topo_1920.png')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/testimonial-marcus.jpg",
                name: "Marcus H.",
                quote: "SelfPar helped me finally stay consistent with my habits. There’s something about putting pencil to paper that makes it stick.",
              },
              {
                img: "/images/testimonial-douglas.jpg",
                name: "Douglas R.",
                quote: "The golf theme makes it feel like a game — but it’s changed how I show up at work and home.",
              },
              {
                img: "/images/testimonial-shawn.jpg",
                name: "Shawn L.",
                quote: "I’ve tried apps before, but nothing has worked like SelfPar. It’s simple, focused, and fun to track progress.",
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-[#1f1f1f] rounded-lg p-6 shadow-md">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-42 h-42 rounded-lg object-cover mx-auto mb-6 border-4 border-[#765c41]-200"
                />
                <p className="italic text-base text-gray-200 mb-4 leading-relaxed">“{t.quote}”</p>
                <p className="font-semibold text-white">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section id="why" className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Why SelfPar Works</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          It’s paper on purpose. Designed to feel intentional. No batteries. No notifications. Just better habits.
        </p>
      </section>

      {/* CTA */}
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
