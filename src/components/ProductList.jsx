import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/mockApi';

const ProductList = ({ selectedCategory, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(data => {
        const filtered = selectedCategory
          ? data.filter(prod => prod.categoryId === selectedCategory)
          : data;
        setProducts(filtered);
      })
      .catch(err => setError(err));
  }, [selectedCategory]);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(prod => (
        <div key={prod.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <img
            src={prod.image}
            alt={prod.name}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <h2 className="font-semibold text-lg">{prod.name}</h2>
          <p className="text-teal-600 font-bold">Rp {prod.price}</p>
          <div className="mt-2">
            <button
              onClick={() => addToCart(prod)}
              className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
            >
              Add to Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
