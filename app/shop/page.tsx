// app/shop/page.tsx

'use client'; // Bu bileşen client tarafında çalışmalıdır

import { useState, useEffect, useMemo } from 'react';
import { HierarchicalCategory, Product } from '@/types';
import { fetchCategories, fetchProducts } from '@/services/api';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  const [categories, setCategories] = useState<HierarchicalCategory[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Veri Çekme İşlemi
  useEffect(() => {
    const loadData = async () => {
      try {
        // Kategorileri hiyerarşik olarak, ürünleri düz olarak çeker
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setCategories(cats);
        setAllProducts(prods);
      } catch (err) {
        setError('Veri yüklenirken bir hata oluştu. Lütfen API bağlantılarını kontrol edin.');
        console.error('API Yükleme Hatası:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Filtreleme Mantığı (API'da kategori bilgisi olmadığı için şimdilik devre dışı)
  const filteredProducts = useMemo(() => {
    // API'dan gelen ürün verisinde kategori adı/ID'si olmadığı için, 
    // seçilen kategoriye göre filtreleme şimdilik mümkün değildir.
    // Kullanıcı bir kategori seçse bile tüm ürünler gösterilecektir.

    if (selectedCategory !== null) {
      console.warn(`Ürün API'sında kategori bilgisi (name/id) eksik olduğu için, 
      "${selectedCategory}" seçimi yoksayılıyor ve tüm ürünler gösteriliyor.`);
    }

    // Seçili kategoriye bakılmaksızın tüm ürünleri göster
    return allProducts; 
  }, [allProducts, selectedCategory]);

  const handleSelectCategory = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
  };

  if (loading) return <div className="text-center p-20 text-xl text-gray-600">Ürünler yükleniyor...</div>;
  if (error)
    return <div className="text-center p-20 text-xl text-red-600 font-bold">❌ Hata: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Sayfa Başlığı */}
      <h1 className="text-3xl font-light text-gray-800 mb-8 max-w-7xl mx-auto">
        **GET THE PRODUCTS AS YOUR NEEDS**
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sol Sütun: Kategori Filtreleri */}
        <aside className="lg:w-1/4">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </aside>

        {/* Ana İçerik: Ürün Listesi */}
        <main className="lg:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="p-10 text-center text-xl text-gray-500 bg-white rounded-lg shadow-md">
              Gösterilecek ürün bulunmamaktadır.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}