import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { CartProvider } from './context/CartContext';
import { DrawerProvider } from './context/DrawerContext'; // 👈 import the DrawerProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <DrawerProvider> {/* 👈 wrap with DrawerProvider */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DrawerProvider>
    </CartProvider>
  </React.StrictMode>
);