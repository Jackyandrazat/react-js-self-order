import React from 'react';
import { useNavigate } from 'react-router-dom';
import Payment from '../components/Payment';
import useOrderStore from '../store/orderStore';
import { createOrder } from '../api/mockApi';

const PaymentPage = () => {
  const items = useOrderStore((state) => state.items);
  const clearItems = useOrderStore((state) => state.clearItems);
  const navigate = useNavigate();

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      const orderData = { items, payment: paymentResponse };
      const result = await createOrder(orderData);
      if (result.success) {
        clearItems();
        alert('Payment successful! Your order has been placed.');
        navigate('/');
      }
    } catch (error) {
      alert('Failed to place order: ' + error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Payment amount={totalAmount} onPaymentSuccess={handlePaymentSuccess} />
    </div>
  );
};

export default PaymentPage;
