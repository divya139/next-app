'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

interface AddToCartProps {
  productId: string;
}

const AddToCart = ({ productId }: AddToCartProps) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
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

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      productImage: product.image,
      productTitle: product.title,
      price: product.price,
      quantity,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <button className="btn btn-primary" disabled>Loading...</button>;
  }

  if (error || !product) {
    return <button className="btn btn-primary" disabled>Product Unavailable</button>;
  }

  return (
    <>
      <div className="flex gap-2 items-center">
        <input 
          type="number" 
          min="1" 
          max="100" 
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="input input-bordered w-16"
        />
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">Added to Cart!</h3>
            
            <div className="flex gap-4">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h4 className="font-semibold text-base">{product.title}</h4>
                <p className="text-sm text-gray-200 mt-2">Price: ${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-200">Quantity: {quantity}</p>
                <p className="text-sm font-bold mt-2">Total: ${(product.price * quantity).toFixed(2)}</p>
              </div>
            </div>

            <div className="modal-action">
              <button className="btn btn-sm" onClick={handleCloseModal}>
                Continue Shopping
              </button>
              <Link className="btn btn-sm btn-primary" href={'/cart'}>
                View Cart
              </Link>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleCloseModal}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default AddToCart;
