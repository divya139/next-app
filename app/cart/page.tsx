"use client";
import React from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Trash } from "lucide-react";

const CartPage = () => {
  const cartItems = useStore((state) => state.cartItems);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const getTotalPrice = useStore((state) => state.getTotalPrice);

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="alert alert-info bg-white rounded-lg shadow-md p-4 outline-black/5 dark:bg-gray-800 items-center">
            <span className='text-white text-xl'>Your cart is empty !
                 <Link className="btn btn-primary btn-sm ml-4" href={'/'}>Continue Shopping</Link>
            </span>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white outline outline-black/5 dark:bg-gray-800 rounded-lg shadow-md p-4"
                >
                  <div className="flex gap-4 items-center">
                    {/* Product Image - Left */}
                    <img
                      src={item.productImage}
                      alt={item.productTitle}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    {/* Product Details - Middle */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        <Link href={`/productdetails?id=${item.id}`}>
                        {item.productTitle}
                        </Link>
                        </h3>
                      <p className="text-gray-200 mt-1">
                        Price: ${item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-200">Quantity: {item.quantity}</p>
                    </div>

                    {/* Price and Actions - Right */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn btn-sm btn-ghost mt-2"
                      >
                        <Trash/> 
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Order Summary</h2>
                <div className="text-right">
                  <p className="text-gray-200">
                    Subtotal: ${getTotalPrice().toFixed(2)}
                  </p>
                  <p className="text-gray-200">Shipping: $10.00</p>
                  <p className="text-2xl font-bold mt-2">
                    Total: ${(getTotalPrice() + 10).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Place Order Button */}
              <div className="flex justify-end">
                <Link
                  href="/checkout"
                  className="btn btn-primary btn-lg"
                >
                  Place Order
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;