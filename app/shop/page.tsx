// app/shop/page.tsx

'use client'; 

import { useState, useEffect, useMemo } from 'react';
// Yeni yardımcı fonksiyon için HierarchicalCategory'yi kullanıyoruz
import { HierarchicalCategory, Product } from '@/types'; 
import { fetchCategories, fetchProducts } from '@/services/api';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';

// ⚠️ NOT: Filtrelemenin çalışması için, Product tipine "categoryName: string;" 
// alanını ve bu veriyi API'dan çekmeyi eklemelisiniz. 
// Aksi takdirde, filtreleme hala tüm ürünleri döndürecektir.

// --- YARDIMCI FONKSİYON: Seçili kategori ve tüm alt kategorilerinin adlarını toplar ---
const getCategoryNamesRecursive = (
    categories: HierarchicalCategory[], 
    targetName: string,
    names: string[] = []
): string[] => {
    
    // Hangi kategorinin seçili olduğunu bul
    const targetCategory = categories.find(cat => cat.name === targetName);

    if (targetCategory) {
        // Seçili kategorinin adını listeye ekle
        names.push(targetCategory.name); 

        // Tüm alt kategorileri gez
        const traverse = (children: HierarchicalCategory[]) => {
            children.forEach(child => {
                names.push(child.name);
                if (child.children.length > 0) {
                    traverse(child.children);
                }
            });
        };
        
        traverse(targetCategory.children);
    } else {
        // Eğer seçilen kategori üst düzeyde bulunamazsa, alt dallarda arama yap
        categories.forEach(cat => {
            getCategoryNamesRecursive(cat.children, targetName, names);
        });
    }

    // Tekrarları önlemek için Set kullanarak benzersiz hale getir
    return Array.from(new Set(names));
};


export default function ShopPage() {
    const [categories, setCategories] = useState<HierarchicalCategory[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 1. Veri Çekme İşlemi (Aynı kalır)
    useEffect(() => {
        const loadData = async () => {
            try {
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

    // 2. Filtreleme Mantığı (GÜNCELLENDİ)
    const filteredProducts = useMemo(() => {
        if (selectedCategory === null) {
            return allProducts; // Hiçbir şey seçilmediyse tüm ürünleri göster
        }

        // Seçili kategoriye ve tüm alt kategorilerine ait adları al
        const categoryNamesToFilter = getCategoryNamesRecursive(categories, selectedCategory);
        
        if (categoryNamesToFilter.length === 0) {
            // Seçili kategori bulunamadıysa (bu nadir olmalı)
            return [];
        }

        // Filtreleme yap
        return allProducts.filter(product => {
            // ⚠️ KRİTİK NOKTA: Ürün nesnesinin (product) 'categoryName' alanına sahip olduğu VARSAYILIR.
            // Bu alana sahip olmayan ürünler filtrelenmeyecektir.
            // Bu alan API'dan gelmelidir veya frontend'de eşleştirilmelidir.
            // Örnek: product.categoryName
            return categoryNamesToFilter.includes((product as any).categoryName);
        });
        
    }, [allProducts, selectedCategory, categories]);

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