import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/mockApi';

const ProductList = ({ selectedCategory, addToCart, cartItems = [], onQtyChange }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(data => {
        const filtered = selectedCategory
          ? data.filter(prod => prod.categoryId === selectedCategory)
          : data;
        setProducts(filtered);
      })
      .catch(err => setError(err.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const getCartQty = (id) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card bg-base-200 animate-pulse">
            <div className="aspect-square bg-base-300 rounded-t-xl"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-4 bg-base-300 rounded w-1/2"></div>
              <div className="h-10 bg-base-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map(product => {
        const qty = getCartQty(product.id);
        return (
          <div key={product.id} className="card bg-base-100 shadow-xl">
            <figure className="relative aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
              {product.lowStock && (
                <span className="badge badge-warning absolute top-2 right-2 animate-pulse">Low Stock</span>
              )}
            </figure>
            <div className="card-body p-4 flex flex-col justify-between">
              <div>
                <h3 className="card-title text-base font-semibold truncate">{product.name}</h3>
                <p className="text-primary font-bold text-lg">Rp {product.price.toLocaleString()}</p>
              </div>
              <div className="mt-2">
                {qty > 0 ? (
                  <div className="flex items-center gap-2 justify-center">
                    <button className="btn btn-sm btn-outline btn-primary rounded-full" onClick={() => onQtyChange(product.id, qty - 1)}>-</button>
                    <span className="font-semibold">{qty}</span>
                    <button className="btn btn-sm btn-primary rounded-full" onClick={() => onQtyChange(product.id, qty + 1)}>+</button>
                  </div>
                ) : (
                  <button className="btn btn-primary btn-block rounded-full" onClick={() => addToCart(product.id)}>
                    Tambah
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
