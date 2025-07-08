import React, { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import OrderCart from '../components/OrderCart';
import useOrderStore from '../store/orderStore';
import { useNavigate } from 'react-router-dom';

const SelfOrderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const addItem = useOrderStore((state) => state.addItem);
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const proceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <CategoryFilter onSelect={handleCategorySelect} />
      <ProductList selectedCategory={selectedCategory} addToCart={handleAddToCart} />
      <OrderCart proceedToPayment={proceedToPayment} />
    </div>
  );
};

export default SelfOrderPage;
