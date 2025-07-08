import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/mockApi';

const CategoryFilter = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => setError(err));
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex space-x-2 my-4">
      <button onClick={() => onSelect(null)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
        All
      </button>
      {categories.map(cat => (
        <button key={cat.id} onClick={() => onSelect(cat.id)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
