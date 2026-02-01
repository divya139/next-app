'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface AddressDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const CheckoutPage = () => {
  const [formData, setFormData] = useState<AddressDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Navigate to payment page
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="bg-white rounded-lg shadow-md  outline-black/5 dark:bg-gray-800 p-8">
          <h2 className="text-2xl font-semibold mb-6">Address Details</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Full Name *</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Email *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-white">Phone Number *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Address */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-white">Address *</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* City */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">City *</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* State */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">State *</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Zip Code */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Zip Code *</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Country */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Country *</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            {/* Proceed to Payment Button */}
            <div className="flex justify-end mt-8">
              <button type="submit" className="btn btn-primary btn-lg">
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;