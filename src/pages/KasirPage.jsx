import React, { useEffect, useState } from 'react';
import { getOrders, verifyOrder, getStockNotifications } from '../api/mockApi';

const KasirPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState([]);
  const [verifying, setVerifying] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getOrders('waiting');
    setOrders(data);
    setLoading(false);
  };

  const fetchNotif = async () => {
    const n = await getStockNotifications();
    setNotif(n);
  };

  useEffect(() => {
    fetchOrders();
    fetchNotif();
  }, []);

  const handleVerify = async (orderId) => {
    setVerifying(orderId);
    await verifyOrder(orderId);
    setVerifying(null);
    fetchOrders();
    fetchNotif();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Verifikasi Pesanan (Kasir)</h2>
      {notif.length > 0 && (
        <div className="mb-4">
          {notif.map((n, i) => (
            <div key={i} className={`mb-2 px-4 py-2 rounded text-sm ${n.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>{n.message}</div>
          ))}
        </div>
      )}
      {loading ? (
        <div>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">Tidak ada pesanan baru.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded shadow p-4">
              <div className="mb-2 font-semibold">Meja/Area: {order.table?.name || order.table || '-'}</div>
              <div className="mb-2">Waktu: {new Date(order.createdAt).toLocaleString()}</div>
              <div className="mb-2">Status: <span className="font-bold text-yellow-700">Menunggu Verifikasi</span></div>
              <div className="mb-2">
                <div className="font-semibold mb-1">Pesanan:</div>
                <ul className="list-disc ml-6">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.name} x {item.quantity}</li>
                  ))}
                </ul>
              </div>
              <button
                className="mt-2 px-4 py-2 rounded bg-primary-500 text-white font-bold hover:bg-primary-600 transition"
                onClick={() => handleVerify(order.id)}
                disabled={verifying === order.id}
              >
                {verifying === order.id ? 'Memverifikasi...' : 'Verifikasi & Kurangi Stok'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KasirPage;
