import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SelfOrderPage from './pages/SelfOrderPage';
import PaymentPage from './pages/PaymentPage';
import Header from './components/Header';
import Notifications from './components/Notifications';

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <Notifications />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<SelfOrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
