// components/ProductCard.tsx

import { Product } from '@/types';
import React from 'react';

// Resimlerin yükleneceği BASE URL
const IMAGE_BASE_URL = 'http://34.61.30.58:8001/';

// Basit Kalp İkonu
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.835 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    
    // İlk resmi al veya placeholder kullan
    const imageUrl = product.images.length > 0 
        ? `${IMAGE_BASE_URL}${product.images[0].image}`
        : '/placeholder.png'; // Projenizin public klasörüne placeholder.png eklemeyi unutmayın
        
    // Fiyatı sayıya çevir
    const priceValue = parseFloat(product.price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg z-10 hover:scale-105 transition">
          <HeartIcon />
        </button>
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover object-center"
          // Next/Image kullanmıyorsak stil zorunludur
        />
      </div>
      <div className="p-4">
        {/* Kategori Etiketi (API'da bu bilgi gelmiyor, boş bırakıldı) */}
        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider h-3">
          {/* Kategori Adı Buraya Gelecek */}
        </p> 
        <h3 className="text-sm font-semibold text-gray-800 h-10 overflow-hidden mb-3 leading-tight">
          {product.title}
        </h3>
        <div className="flex items-end justify-between">
          <div className="text-lg font-bold text-green-700">
            {priceValue.toFixed(2)} **{product.currency}**
          </div>
          {/* API'da oldPrice gelmediği için indirim kısmı kaldırıldı */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;