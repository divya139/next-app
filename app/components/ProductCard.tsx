import React from "react";
import AddToCart from "./AddToCart";
//import styles from './ProductCard.module.css';

interface Products {
  id: number;
  title: string;
  url: string;
  thumbnailurl: string;
}

const ProductCard = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");
  const products: Products[] = await res.json();
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 w-80 shadow-sm ">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <AddToCart />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default ProductCard;
