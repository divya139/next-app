'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface AddToCartProps {
  productImage?: string;
  productTitle?: string;
  price?: number;
  quantity?: number;
}

const AddToCart = ({ 
  productImage = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  productTitle = "Product Title",
  price = 99.99,
  quantity = 1
}: AddToCartProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleAddToCart}>
        Add to Cart
      </button>

      {/* Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">Added to Cart!</h3>
            
            <div className="flex gap-4">
              <img 
                src={productImage} 
                alt={productTitle}
                className="w-24 h-24 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h4 className="font-semibold text-base">{productTitle}</h4>
                <p className="text-sm text-gray-600 mt-2">Price: ${price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                <p className="text-sm font-bold mt-2">Total: ${(price * quantity).toFixed(2)}</p>
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
