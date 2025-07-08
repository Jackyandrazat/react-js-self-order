import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SelfOrderPage from './pages/SelfOrderPage';
import PaymentPage from './pages/PaymentPage';
import CustomerDataPage from './pages/CustomerDataPage';
import ReviewOrderPage from './pages/ReviewOrderPage';
import Header from './components/Header';
import Notifications from './components/Notifications';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header />
      <Notifications />
      <main className="pt-20 pb-32 px-4">
        <Routes>
          <Route path="/" element={<SelfOrderPage />} />
          <Route path="/customer" element={<CustomerDataPage />} />
          <Route path="/review" element={<ReviewOrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
