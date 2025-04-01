import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { countries } from '../data/countries';
import { states } from '../data/states';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    shipping,
    setShipping,
    shippingCost,
    subtotal,
    total,
    handleEstimateShipping,
    handleCheckout,
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Header with logo and cart icon */}
      <header className="flex justify-between items-center mb-10">
        <Link to="/" className="text-2xl font-bold text-green-800">SelfPar</Link>
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-green-800" />
        </Link>
      </header>

      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">
          Your cart is empty. <Link to="/#shop" className="text-green-700 underline">Continue Shopping</Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left: Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                  </div>
                  <p className="text-gray-600 mt-1 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm">Remove</button>
              </div>
            ))}

            {/* Estimate Shipping */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Estimate Shipping</h3>
              <div className="space-y-2">
                <select
                  value={shipping.country}
                  onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.name}>{c.name}</option>
                  ))}
                </select>

                <select
                  value={shipping.state}
                  onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                />

                <button onClick={handleEstimateShipping} className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 mt-2">
                  Estimate Shipping
                </button>
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="bg-white p-6 rounded shadow h-fit">
            <h3 className="text-xl font-bold mb-4">Summary</h3>
            <p className="text-sm text-gray-700 mb-2">Subtotal: ${subtotal.toFixed(2)}</p>
            {shippingCost !== null && (
              <p className="text-sm text-gray-700 mb-2">
                Shipping: {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </p>
            )}
            <p className="text-lg font-bold text-gray-900 mt-4 mb-6">Total: ${total.toFixed(2)}</p>
            <button onClick={handleCheckout} className="w-full bg-green-800 text-white py-3 rounded hover:bg-green-700 text-lg font-semibold">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}