import React from "react";
import AddToCart from "./AddToCart";
import Link from "next/link";

//import styles from './ProductCard.module.css';

interface Products {
 id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

const ProductCard = async () => {
   const res = await fetch("http://localhost:3000/api/products", {
    cache: 'no-store' // Ensures fresh data on each request
  });
   if (!res.ok) {
    return <div className="text-center p-8 text-error">Failed to load products</div>;
  }
  
  const products: Products[] = await res.json();

  if (!products || products.length === 0) {
    return <div className="text-center p-8">No products available</div>;
  }


  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 w-80 shadow-sm">
            <Link href="/productdetails">
              <figure>
                <img
                  src={product.image ? product.image : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                  alt={product.title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p>{product.description}</p> 
                <p className="text-lg font-bold text-white">${product.price.toFixed(2)}</p>
              </div>
            </Link>
            <div className="card-body pt-0">
              <div className="card-actions justify-end">
                <AddToCart 
                  productId={product.id}
                />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default ProductCard;
