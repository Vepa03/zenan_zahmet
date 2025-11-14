// store/useProductsStore.ts
"use client";

import { create } from "zustand";
import { Product, products as initialProducts } from "@/constants/product";

type ProductsState = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
};

export const useProductsStore = create<ProductsState>((set) => ({
  products: initialProducts,
  addProduct: (product) =>
    set((state) => ({
      products: [product, ...state.products],
    })),
  updateProduct: (id, data) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));
