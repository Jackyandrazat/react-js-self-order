import React, { useState } from 'react';
import { processPayment } from '../api/mockApi';

const Payment = ({ amount, onPaymentSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await processPayment({ amount, cardNumber });
      if (response.success) {
        onPaymentSuccess(response);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Card Number</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Enter card number"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
        {loading ? 'Processing...' : `Pay Rp ${amount}`}
      </button>
    </form>
  );
};

export default Payment;
