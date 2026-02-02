'use client';
import React from 'react';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { useStore } from '@/store/useStore';

const OrderSummaryPage = () => {
  const cartItems = useStore((state) => state.cartItems);
  const addressDetails = useStore((state) => state.addressDetails);
  const getTotalPrice = useStore((state) => state.getTotalPrice);

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Order Confirmation</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cart Items Section */}
          <div className="bg-white rounded-lg shadow-md p-6 outline-black/5 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Order Items</h2>
              <Link href="/cart" className="btn btn-sm btn-ghost">
                <Edit size={16} />
                Edit
              </Link>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                  <img
                    src={item.productImage}
                    alt={item.productTitle}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.productTitle}</h3>
                    <p className="text-sm text-gray-200">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-200">Price: ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span className="font-semibold">$10.00</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4">
                <span>Total:</span>
                <span className="text-white">${(getTotalPrice() + 10).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Address Details Section */}
          <div className="bg-white rounded-lg shadow-md p-6 outline-black/5 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Shipping Address</h2>
              <Link href="/checkout" className="btn btn-sm btn-ghost">
                <Edit size={16} />
                Edit
              </Link>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-200">Full Name</p>
                <p className="font-semibold">{addressDetails.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-200">Email</p>
                <p className="font-semibold">{addressDetails.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-200">Phone</p>
                <p className="font-semibold">{addressDetails.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-200">Address</p>
                <p className="font-semibold">{addressDetails.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-200">City</p>
                  <p className="font-semibold">{addressDetails.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-200">State</p>
                  <p className="font-semibold">{addressDetails.state}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-200">Zip Code</p>
                  <p className="font-semibold">{addressDetails.zipCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-200">Country</p>
                  <p className="font-semibold">{addressDetails.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <div className="flex justify-end mt-8">
          <Link href="/orderconfirmation" className="btn btn-primary btn-lg">
            Confirm Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;