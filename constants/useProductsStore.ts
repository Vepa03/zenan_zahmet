// src/constants/useProductsStore.ts

import { create } from 'zustand';
import { Product } from "@/constants/product"; // Ürün tiplerini içe aktarın
import { fetchProducts } from "@/services/productService"; // Servisi içe aktarın

// ShopPage'in kullandığı diğer sabitler (örnek olarak eklendi)
export const productCategories = ["Çokaýlar", "Halı", "Takı", "Giysi"];
export const brands = ["Erkek", "Zenan", "Çaga"];
export const place_names = ["Mary", "Aşgabat", "Lebap", "Balkan", "Daşoguz"];


interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProductsData: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProductsData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchProducts();
      set({ products: data, isLoading: false });
    } catch (err) {
      set({ 
        isLoading: false, 
        error: err instanceof Error ? err.message : "Veri çekilirken bir hata oluştu."
      });
    }
  },
}));

// Uygulama yüklendiğinde veriyi çekmek için (eğer ShopPage'de çağrılmıyorsa)
// İlk renderda veriyi çekmek için ShopPage içinde useLayoutEffect/useEffect kullanmak daha yaygındır.

// Örnek: Eğer ShopPage içinde veriyi çekmiyorsanız, bu store'u kullanacak
// bir Root component içinde çağırabilirsiniz.

// ShopPage içinde kullanım:
/*
  const { products, isLoading, error, fetchProductsData } = useProductsStore();
  useEffect(() => {
    if (products.length === 0) { // Sadece bir kere çekmek için
      fetchProductsData();
    }
  }, [fetchProductsData, products.length]);
*/