import React from 'react';
import useOrderStore from '../store/orderStore';

const OrderCart = ({ proceedToPayment }) => {
  const items = useOrderStore((state) => state.items);
  const removeItem = useOrderStore((state) => state.removeItem);
  const updateItemQuantity = useOrderStore((state) => state.updateItemQuantity);

  if (items.length === 0)
    return <div className="p-4 bg-gray-100 rounded">Your order cart is empty.</div>;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 bg-gray-100 rounded mt-4">
      <h3 className="text-xl font-semibold mb-2">Your Order</h3>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center py-2 border-b">
          <div>
            <p>{item.name}</p>
            <p className="text-sm text-gray-600">
              Rp {item.price} x {item.quantity}
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              className="px-2"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              className="px-2"
            >
              +
            </button>
            <button onClick={() => removeItem(item.id)} className="text-red-500 ml-3">
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 font-bold">Total: Rp {total}</div>
      <button
        onClick={proceedToPayment}
        className="mt-4 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderCart;
