import React, { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import OrderCart from '../components/OrderCart';
import useOrderStore from '../store/orderStore';
import { useNavigate } from 'react-router-dom';

const SelfOrderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const addItem = useOrderStore((state) => state.addItem);
  const items = useOrderStore((state) => state.items);
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const goToCustomerData = () => {
    if (items.length === 0) {
      alert('Keranjang kosong!');
      return;
    }
    navigate('/customer');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <CategoryFilter onSelect={handleCategorySelect} />
      <ProductList selectedCategory={selectedCategory} addToCart={handleAddToCart} />
      <OrderCart proceedToPayment={goToCustomerData} />
      <div className="mt-4 flex justify-end">
        <button
          className="btn btn-primary rounded-full px-8 text-lg shadow"
          onClick={goToCustomerData}
        >
          Isi Data Diri &gt;
        </button>
      </div>
    </div>
  );
};

export default SelfOrderPage;
