// src/services/productService.ts

import { ApiProduct, Product } from "@/constants/product"; // Tipleri içe aktarın

// Verilen API adresi (Next.js Rewrites kuralı ile eşleşir)
const API_URL = "/api/products";

// Gelen veriyi arayüzde kullanılacak formata çeviren yardımcı fonksiyon
const transformProduct = (apiProduct: ApiProduct): Product => {
  // En düşük position değerine sahip resmin göreceli yolunu al
  const imagePath = apiProduct.images
    .sort((a, b) => a.position - b.position)[0]?.image || "placeholder.jpg"; 

  // 1. ADIM: Resim yolunun önüne '/api/' ekleyerek Next.js proxy kuralını kullanmasını sağla.
  // Örn: 'products/images.jpg'  ->  '/api/products/images.jpg' olur
  const proxyImageUrl = `/api/${imagePath}`; // ⬅️ DÜZELTME BURADA YAPILDI

  return {
    ...apiProduct,
    // Fiyatı string'den number'a çevir
    price: Number(apiProduct.price), 
    
    // 2. ADIM: Resim alanına proxy URL'yi atama
    image: proxyImageUrl, // ⬅️ Artık proxy yolu (Örn: /api/products/1.jpg)
    
    // Örnek arayüzdeki filtrelerin çalışması için kategori, marka ve yer alanlarına
    // basit placeholder veya API'den beklenen değerleri ayarlayın.
    category: "Çokaýlar", // Örnek olarak sabit değer atandı
    brand: "Erkek", // Örnek olarak sabit değer atandı
    place: ["Mary", "Aşgabat"], // Örnek olarak sabit değer atandı
    oldPrice: undefined, // API'den gelmiyorsa
  };
};

/**
 * Ürün listesini API'den çeker ve arayüzde kullanılacak formata dönüştürür.
 * @returns Product[] dizisi
 */
export async function fetchProducts(): Promise<Product[]> {
  // ... (Bu fonksiyonun içi doğru kalır)
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API hatası: ${response.status} ${response.statusText}. Detay: ${errorText}`);
    }

    const apiProducts: ApiProduct[] = await response.json(); 
    const products = apiProducts.map(transformProduct);

    return products;

  } catch (error) {
    console.error("Ürünleri çekerken hata oluştu:", error);
    throw new Error(error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu.");
  }
}