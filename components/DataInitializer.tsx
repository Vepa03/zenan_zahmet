// components/DataInitializer.tsx
"use client";
import React, { useEffect } from 'react';
import { useProductsStore } from '@/constants/useProductsStore';

const DataInitializer: React.FC = () => {
  // 💡 DÜZELTME: Hata veren 'fetchProducts' yerine, Store'da tanımlı olan 'fetchProductsData' kullanıldı.
  const fetchProductsData = useProductsStore((state) => state.fetchProductsData);
  
  const productsCount = useProductsStore((state) => state.products.length);

  useEffect(() => {
    if (productsCount === 0) {
        // Düzeltilmiş fonksiyon adı çağrılıyor
        fetchProductsData();
    }
    // Bağımlılıklar (deps) dizisi, fetchProductsData'yı içerecek şekilde ayarlandı
  }, [productsCount, fetchProductsData]); 

  return null;
};

export default DataInitializer;