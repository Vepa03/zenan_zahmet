// types/index.ts

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

// Hiyerarşik yapıyı temsil eden tip
export interface HierarchicalCategory extends Category {
  children: HierarchicalCategory[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  image: string; // Resmin dosya yolu (örn: "products/image.png")
  alt: string;
  position: number;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: string; // API'dan string olarak geliyor ("90.00")
  currency: string;
  description: string;
  images: ProductImage[];
  // NOT: API'ınızda category_id veya category_name gelmediği için
  // bu alana şimdilik yer verilmemiştir.
}

// Filtreleme için yardımcı tip (CategoryFilter'da kullanılıyor)
export interface FilterOption {
    value: string;
    label: string;
}