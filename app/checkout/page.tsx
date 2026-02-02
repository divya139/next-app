'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

const CheckoutPage = () => {
  const addressDetails = useStore((state) => state.addressDetails);
  const setAddressDetails = useStore((state) => state.setAddressDetails);
  const router = useRouter();

  const [formData, setFormData] = useState(addressDetails);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setAddressDetails(formData);
      router.push('/ordersummary');
    } else {
      // Scroll to first error
      const firstErrorField = document.querySelector('.input-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="bg-white outline outline-black/5 dark:bg-gray-800 rounded-lg shadow-md p-8">
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
                  className={`input input-bordered ${errors.fullName ? 'input-error' : ''}`}
                  required
                />
                {errors.fullName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.fullName}</span>
                  </label>
                )}
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
                  className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                  required
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>
                )}
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
                  className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
                  required
                />
                {errors.phone && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.phone}</span>
                  </label>
                )}
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
                  className={`input input-bordered ${errors.address ? 'input-error' : ''}`}
                  required
                />
                {errors.address && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.address}</span>
                  </label>
                )}
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
                  className={`input input-bordered ${errors.city ? 'input-error' : ''}`}
                  required
                />
                {errors.city && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.city}</span>
                  </label>
                )}
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
                  className={`input input-bordered ${errors.state ? 'input-error' : ''}`}
                  required
                />
                {errors.state && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.state}</span>
                  </label>
                )}
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
                  className={`input input-bordered ${errors.zipCode ? 'input-error' : ''}`}
                  required
                />
                {errors.zipCode && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.zipCode}</span>
                  </label>
                )}
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
                  className={`input input-bordered ${errors.country ? 'input-error' : ''}`}
                  required
                />
                {errors.country && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.country}</span>
                  </label>
                )}
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