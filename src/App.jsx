import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import CartDrawer from './components/CartDrawer'; // 👈 import the drawer
import { useDrawer } from './context/DrawerContext'; // 👈 hook for drawer control

export default function App() {
  const { isOpen, closeDrawer } = useDrawer(); // 👈 access drawer state and close function

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <CartDrawer isOpen={isOpen} onClose={closeDrawer} /> {/* 👈 render the drawer globally */}
    </>
  );
}