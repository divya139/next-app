'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';

const OrderConfirmationPage = () => {
  const cartItems = useStore((state) => state.cartItems);
  const addressDetails = useStore((state) => state.addressDetails);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const clearCart = useStore((state) => state.clearCart);
  
  const [orderNumber, setOrderNumber] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate random order number
    const randomOrderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setOrderNumber(randomOrderNumber);
    setIsLoading(false);

    // Send confirmation email
    const sendConfirmationEmail = async () => {
      try {
        const response = await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: addressDetails.email,
            orderNumber: randomOrderNumber,
            cartItems,
            addressDetails,
            totalPrice: getTotalPrice() + 10,
          }),
        });

        const result = await response.json();
        
        if (result.success) {
          setEmailSent(true);
        } else {
          setEmailError(true);
        }
      } catch (error) {
        console.error('Failed to send confirmation email:', error);
        setEmailError(true);
      }
    };

    if (addressDetails.email) {
      sendConfirmationEmail();
    }
  }, [addressDetails.email, cartItems, addressDetails, getTotalPrice]);

  // Prevent hydration mismatch by not rendering until client-side
  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-600">Loading order confirmation...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Order Confirmation Message */}
        <div className="bg-white outline outline-black/5 dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={80} className="text-success" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-success">Order Confirmed!</h1>
          <p className="text-xl mb-2 text-white">Thank you for your purchase!</p>
          <p className="text-lg text-gray-200 mb-4">
            Your order has been successfully placed.
          </p>
          <div className="bg-base-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-200">Order Number</p>
            <p className="text-2xl font-bold text-primary">{orderNumber}</p>
          </div>
          
          {/* Email Status */}
          {emailSent && (
            <div className="alert alert-success mt-4 mx-auto max-w-md">
              <CheckCircle size={20} />
              <span>Confirmation email sent to {addressDetails.email}</span>
            </div>
          )}
          {emailError && (
            <div className="alert alert-warning mt-4 mx-auto max-w-md">
              <span>⚠️ Email could not be sent, but your order is confirmed</span>
            </div>
          )}
          {!emailSent && !emailError && (
            <p className="text-sm text-gray-200 mt-4">
              Sending confirmation email to{' '}
              <span className="font-semibold">{addressDetails.email}</span>...
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cart Items Section */}
          <div className="bg-white rounded-lg shadow-md p-6 outline-black/5 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Order Items</h2>
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

        {/* Continue Shopping Button */}
        <div className="flex justify-center mt-8">
          <Link href="/" className="btn btn-primary btn-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;