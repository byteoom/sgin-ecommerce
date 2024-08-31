// src/components/sgin/ProductItem.tsx
import Image from "next/image";
import React from "react";

interface ProductProps {
  imageUrl: string;
  name: string;
  price: number;
  description: string;
  onViewDetails?: () => void;
  onAddToCart?: () => void;
}

const ProductItem: React.FC<ProductProps> = ({
  imageUrl,
  name,
  price,
  description,
  onViewDetails,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between h-[380px]"> {/* Set a fixed height */}
      <div className="relative h-48"> {/* Ensure consistent image height */}
        <Image
          src={imageUrl}
          alt={name}
          layout="fill" // Make the image cover the container
          objectFit="cover" // Ensure the image covers the area properly
          className="w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 flex-1">{description}</p> {/* Allow description to flex */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">${price.toFixed(2)}</span>
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
              onClick={onAddToCart}
            >
              加入购物车
            </button>
            <button
              className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400 transition"
              onClick={onViewDetails}
            >
              查看详情
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
