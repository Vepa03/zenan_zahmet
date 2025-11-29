// services/api.ts

import { Category, HierarchicalCategory, Product } from '@/types';

// API URL'leriniz
const BASE_URL = '/api';
const CATEGORIES_URL = `${BASE_URL}/categories`;
const PRODUCTS_URL = `${BASE_URL}/products`;

// Düz kategori listesini hiyerarşik ağaca dönüştüren fonksiyon
const buildCategoryTree = (categories: Category[]): HierarchicalCategory[] => {
  const map: { [key: number]: HierarchicalCategory } = {};
  const tree: HierarchicalCategory[] = [];

  categories.forEach(cat => {
    map[cat.id] = { ...cat, children: [] };
  });

  categories.forEach(cat => {
    if (cat.parent_id !== null && map[cat.parent_id]) {
      map[cat.parent_id].children.push(map[cat.id]);
    } else if (cat.parent_id === null) {
      tree.push(map[cat.id]);
    }
  });

  return tree;
};


export const fetchCategories = async (): Promise<HierarchicalCategory[]> => {
  try {
    // Statik veriyi cache'lemek için revalidate kullanıldı
    const response = await fetch(CATEGORIES_URL, { next: { revalidate: 3600 } }); 
    if (!response.ok) {
      throw new Error('Kategoriler çekilemedi.');
    }
    const flatCategories: Category[] = await response.json();
    
    // Hiyerarşik ağaca dönüştürülmüş veriyi döndür
    return buildCategoryTree(flatCategories); 

  } catch (error) {
    console.error('Kategori hatası:', error);
    return [];
  }
};


export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(PRODUCTS_URL, { next: { revalidate: 60 } }); 
    if (!response.ok) {
      throw new Error('Ürünler çekilemedi.');
    }
    const data: Product[] = await response.json();
    
    // Veri yapısı doğrudan Product interface'ine uyuyor
    return data; 

  } catch (error) {
    console.error('Ürün hatası:', error);
    return [];
  }
};