// components/DataInitializer.tsx
"use client";
import React, { useEffect } from 'react';
import { useProductsStore } from '@/constants/useProductsStore';

const DataInitializer: React.FC = () => {
  const fetchProducts = useProductsStore((state) => state.fetchProducts);
  const productsCount = useProductsStore((state) => state.products.length);

  useEffect(() => {
    if (productsCount === 0) {
        fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return null;
};

export default DataInitializer;