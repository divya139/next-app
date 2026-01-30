'use client';
import React, { useState } from 'react';
import AddToCart from '../components/AddToCart';

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row gap-8 max-w-6xl">
        {/* Product Image - Left */}
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Product"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        
        {/* Product Details - Right */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">Product Title</h1>
          <p className="text-lg">
            A card component has a figure, a body part, and inside body
            there are title and actions parts
          </p>
          
          {/* Price */}
          <div className="text-3xl font-bold text-primary">
            $99.99
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
            <AddToCart 
              productImage="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              productTitle="Product Title"
              price={99.99}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;