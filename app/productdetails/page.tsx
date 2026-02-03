'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AddToCart from '../components/AddToCart';

const ProductDetailsPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-error">{error || 'Product not found'}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row gap-8 max-w-6xl">
        {/* Product Image - Left */}
        <img
          src={product.image}
          alt={product.title}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        
        {/* Product Details - Right */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">{product.title}</h1>
          <p className="text-lg">
            {product.description}
          </p>
          
          {/* Price */}
          <div className="text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>
            <div className="join">
              <button 
                className="btn btn-sm join-item"
                onClick={handleDecrease}
              >
                -
              </button>
              <input 
                type="text" 
                value={quantity}
                readOnly
                className="input input-sm input-bordered join-item w-16 text-center"
              />
              <button 
                className="btn btn-sm join-item"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="mt-4">
            <AddToCart productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;