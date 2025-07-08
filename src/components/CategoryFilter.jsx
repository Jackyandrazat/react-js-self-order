import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/mockApi';

const CategoryFilter = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => setError(err.message || 'Failed to load categories'));
  }, []);

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    onSelect(categoryId);
  };

  if (error) {
    return (
      <div className="alert alert-error mb-4">
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Kategori</h2>
      <div className="overflow-x-auto">
        <div className="tabs tabs-boxed w-fit bg-base-200">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`tab tab-lg ${activeCategory === null ? 'tab-active text-primary' : ''}`}
          >
            Semua
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`tab tab-lg ${activeCategory === cat.id ? 'tab-active text-primary' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
