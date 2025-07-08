import React from 'react';
import useOrderStore from '../store/orderStore';

const OrderCart = ({ proceedToPayment }) => {
  const items = useOrderStore((state) => state.items);
  const removeItem = useOrderStore((state) => state.removeItem);
  const updateItemQuantity = useOrderStore((state) => state.updateItemQuantity);

  if (items.length === 0)
    return <div className="alert alert-info justify-center">Keranjang pesanan kosong.</div>;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative">
      <div className="card bg-base-100 shadow mt-4 max-w-2xl mx-auto">
        <div className="card-body">
          <h3 className="card-title text-xl mb-2">Pesanan Anda</h3>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-base-200 last:border-b-0">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-base-content/60">
                  Rp {(item.price ?? 0).toLocaleString()} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  className="btn btn-xs btn-outline btn-primary rounded-full"
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  className="btn btn-xs btn-primary rounded-full"
                >
                  +
                </button>
                <button onClick={() => removeItem(item.id)} className="btn btn-xs btn-error ml-2">Hapus</button>
              </div>
            </div>
          ))}
          <div className="mt-4 font-bold text-lg">Total: Rp {total.toLocaleString()}</div>
          <button
            onClick={proceedToPayment}
            className="mt-4 btn btn-primary btn-block text-lg rounded-full"
          >
            Lanjut Pembayaran
          </button>
        </div>
      </div>
      {/* Sticky cart bar for mobile/desktop */}
      <div className="fixed bottom-0 left-0 w-full bg-base-100 shadow-t z-30 px-4 py-3 flex items-center justify-between md:hidden">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-2 items-center">
            {items.map((item) => (
              <span key={item.id} className="badge badge-outline badge-lg font-medium">
                {item.name} x {item.quantity}
              </span>
            ))}
          </div>
          <div>
            <span className="font-bold text-primary text-lg">Rp {total.toLocaleString()}</span>
          </div>
        </div>
        <button className="btn btn-primary rounded-full px-6" onClick={proceedToPayment}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderCart;
