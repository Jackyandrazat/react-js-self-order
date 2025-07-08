import React from 'react';
import useOrderStore from '../store/orderStore';
import { useNavigate } from 'react-router-dom';
import { createOrder, getTables } from '../api/mockApi';

const ReviewOrderPage = () => {
  const items = useOrderStore((state) => state.items);
  const customer = useOrderStore((state) => state.customerData);
  const clearItems = useOrderStore((state) => state.clearItems);
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    if (!customer || !customer.name || !customer.wa || !customer.table) {
      alert('Data diri belum lengkap!');
      navigate('/customer');
      return;
    }
    try {
      const tables = await getTables();
      const tableObj = tables.find((t) => t.id === Number(customer.table));
      const orderData = {
        items,
        customer: {
          name: customer.name,
          wa: customer.wa,
          note: customer.note,
        },
        table: tableObj,
      };
      const result = await createOrder(orderData);
      if (result.success) {
        clearItems();
        alert('Pesanan berhasil dikirim! Menunggu verifikasi kasir.');
        navigate('/');
      }
    } catch (e) {
      alert('Gagal mengirim pesanan: ' + e);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 card bg-base-100 shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Review Pesanan</h2>
      <div className="mb-4">
        <div className="mb-1 font-semibold">Nama: <span className="font-normal">{customer?.name}</span></div>
        <div className="mb-1 font-semibold">WA: <span className="font-normal">{customer?.wa}</span></div>
        <div className="mb-1 font-semibold">Meja: <span className="font-normal">{customer?.table}</span></div>
        {customer?.note && <div className="mb-1 font-semibold">Catatan: <span className="font-normal">{customer.note}</span></div>}
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Pesanan:</div>
        <ul className="list-disc ml-6">
          {items.map((item, idx) => (
            <li key={idx}>{item.name} x {item.quantity}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4 font-bold text-lg">Total: Rp {total.toLocaleString()}</div>
      <button className="btn btn-primary btn-block rounded-full text-lg" onClick={handleOrder}>
        Pesan Sekarang
      </button>
    </div>
  );
};

export default ReviewOrderPage;
