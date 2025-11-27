// src/types/product.ts (veya @/constants/product.ts içine eklenebilir)

export interface ProductImage {
  id: number;
  product_id: number;
  image: string; // Resim yolu: "products/images.jpg" gibi
  alt: string;
  position: number;
}

export interface ApiProduct {
  id: number;
  title: string;
  slug: string;
  price: string; // API'den string olarak geliyor
  currency: string; // "TMT"
  description: string;
  images: ProductImage[];
  // API'den gelmeyen ancak state'te tutmak isteyeceğiniz alanlar için
  // category, brand, place, oldPrice gibi alanları da ekleyelim (mevcut ShopPage'e uyum için)
  category: string; 
  brand: string;
  place: string[];
  oldPrice?: number; // Opsiyonel
}

// Arayüzde kullanılan daha işlenmiş ürün tipi
export interface Product extends Omit<ApiProduct, 'price'> {
  price: number; // Arayüzde sayı olarak kullanmak için
  image: string; // İlk resmin yolu
}