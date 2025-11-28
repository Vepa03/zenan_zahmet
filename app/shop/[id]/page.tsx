// app/shop/[id]/page.tsx (veya bulunduğunuz dosya)
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/constants/product"; // Ürün tipi
import { useProductsStore } from "@/constants/useProductsStore"; // Zustand Store
import { Heart, Phone, Loader2 } from "lucide-react"; // Ikonlar

// --- 1. Bileşen Props Tipi ---
type PageProps = {
  // params objesi Next.js tarafından Client Component'e props olarak gönderilir.
  params: { 
    id: string; // URL segmentinden gelen ürün ID'si
  }; 
};

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = params; // ID'yi doğrudan params'tan alıyoruz.

  // --- 2. Zustand Store Erişimi ---
  const products = useProductsStore((state) => state.products);
  const isLoading = useProductsStore((state) => state.isLoading);
  const error = useProductsStore((state) => state.error);
  const fetchProductsData = useProductsStore((state) => state.fetchProductsData);

  // --- 3. Veri Çekme Etkisi (Sadece ürünler boşsa çeker) ---
  useEffect(() => {
    if (products.length === 0 && !isLoading && !error) {
      fetchProductsData();
    }
  }, [products.length, isLoading, error, fetchProductsData]);

  // --- 4. Ürünü ID ile Bulma ---
  // Ürünler yüklendikten sonra find işlemini useMemo ile optimize ediyoruz.
  const product: Product | undefined = useMemo(
    () => products.find((p) => String(p.id) === id),
    [products, id]
  );

  // --- 5. State'ler ---
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  // --- 6. Görsel Galeri Oluşturma ---
  // Product'ın kendisi yüklendikten sonra galeriyi hazırlıyoruz.
  const gallery: string[] = useMemo(() => {
    if (!product) return [];
    
    // API'den gelen çoklu görselleri (image yolu /api/ ile proxy edilmiş) listeler
    const multiImages = 
      product.images && product.images.length > 0 
        ? product.images.map(img => `/api/${img.image}`) 
        : [];
    
    // product.image zaten proxy edilmiş tek görseli içeriyor olmalı
    return multiImages.length > 0 ? multiImages : [product.image];
  }, [product]);

  // Seçili Görsel State'i (Başlangıçta ilk görseli kullan)
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined); 
  
  // Ürün yüklendiğinde seçili görseli ayarla
  useEffect(() => {
    if (product && gallery.length > 0 && selectedImage === undefined) {
      setSelectedImage(gallery[0]);
    }
  }, [product, gallery, selectedImage]);
  
  // --- GUARD CLAUSE'lar ---

  // Yükleme durumu
  if (isLoading || selectedImage === undefined) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5]">
        <Loader2 className="w-8 h-8 mr-3 animate-spin text-emerald-600" />
        <div className="text-lg text-slate-500 mt-2">Ürün yükleniyor...</div>
      </div>
    );
  }

  // Ürün bulunamadı durumu (ID dolu ama API'den gelmedi)
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-lg text-center space-y-4">
          <h1 className="text-xl font-semibold text-red-600">
            Ürün bulunamadı (ID: {id})
          </h1>
          <p className="text-sm text-slate-500">
             Lütfen URL'yi kontrol edin veya liste sayfasına geri dönün.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="px-6 py-2 text-sm rounded-full bg-emerald-700 text-white hover:bg-emerald-800 transition"
          >
            Ürünlere geri dön
          </button>
        </div>
      </div>
    );
  }

  // Varsayılan düğme ayarları
  const defaultButtons = {
    addToCart: true,
    wishlist: true,
    askQuestion: true,
  };
  const buttons = defaultButtons; 

  // --- Sepete Ekleme Fonksiyonu ---
  const handleAddToCart = async () => {
    setIsAdding(true);
    setMessage(null);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setMessage("Sepete eklemek için lütfen önce giriş yapın.");
      setIsAdding(false);
      return;
    }

    // next.config.ts kuralı sayesinde burası /api/cart/add olarak kalabilir
    const CART_ADD_URL = '/api/cart/add'; 

    try {
      const response = await fetch(CART_ADD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1, 
        }),
      });

      if (response.ok) {
        setMessage(`"${product.title}" sepete başarıyla eklendi! 🎉`);
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
            setMessage("Oturumunuzun süresi doldu, lütfen tekrar giriş yapın.");
        } else {
            setMessage(errorData.detail || `Sepete eklenirken bir hata oluştu: ${response.status}`);
        }
      }
    } catch (err) {
      setMessage("Ağ hatası: Sunucuya ulaşılamadı. Lütfen internet bağlantınızı kontrol edin.");
    } finally {
      setIsAdding(false);
    }
  };
  // --- Fonksiyon Sonu ---


  // --- 7. Ana Render Bloğu ---
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col gap-8">
        
        {/* ÜST BLOK: Görsel ve Bilgiler */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SOL: ANA GÖRSEL + THUMBNAILS */}
          <div className="flex-1 lg:w-1/2">
            <div className="relative w-full aspect-[4/3] border border-slate-200 rounded-2xl bg-[#fafafa] flex items-center justify-center">
              <Image
                // selectedImage artık asla undefined olmamalı
                src={selectedImage!} 
                alt={product.title} 
                fill
                unoptimized
                className="object-contain p-6"
                priority
              />
            </div>

            {/* THUMBNAILS */}
            {gallery.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto">
                    {gallery.map((img) => (
                      <button
                        key={img}
                        onClick={() => setSelectedImage(img)}
                        className={`relative h-20 w-20 flex-shrink-0 border rounded-2xl bg-[#fafafa] overflow-hidden transition ${
                          selectedImage === img
                            ? "ring-2 ring-emerald-600 border-transparent"
                            : "hover:border-emerald-600/70"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={product.title} 
                          fill
                          unoptimized
                          className="object-contain p-2"
                        />
                      </button>
                    ))}
                </div>
            )}
          </div>

          {/* SAĞ: ÜRÜN BİLGİLERİ */}
          <div className="flex-1 lg:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl font-bold leading-snug text-slate-900">
              {product.title} 
            </h1>

            <p className="text-sm text-slate-600">
              {product.description ?? "Bu ürün hakkında detaylı bir açıklama yakında eklenecektir."}
            </p>

            {/* Fiyat */}
            <div className="flex items-baseline gap-3 pt-2 border-t border-slate-100">
              <span className="text-4xl font-extrabold text-emerald-700">
                {Number(product.price).toFixed(2)} TM
              </span>
              {product.oldPrice && (
                <span className="text-lg text-slate-400 line-through">
                  {product.oldPrice.toFixed(2)} TM
                </span>
              )}
            </div>

            {/* Mesaj/Hata Gösterimi */}
            {message && (
                <div className={`p-3 rounded-xl text-sm font-medium ${message.includes('başarıyla') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            {/* Ana Butonlar */}
            <div className="mt-4 flex items-center gap-3">
              
              {/* SEPETE EKLE BUTONU */}
              {buttons.addToCart && (
                <button 
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 px-6 py-3 text-lg rounded-2xl bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-700/30 hover:bg-emerald-800 transition disabled:bg-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
                >
                    {isAdding ? (
                        <span className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Ekleniyor...
                        </span>
                    ) : "Sepete Ekle"}
                </button>
              )}

              {buttons.wishlist && (
                <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 hover:border-red-500 hover:text-red-500 transition">
                  <Heart className="w-6 h-6" />
                </button>
              )}

              {buttons.askQuestion && ( 
                <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 hover:border-emerald-600 hover:text-emerald-600 transition" >
                  <Phone className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* ALT BLOK: Detaylar */}
        <div className="flex flex-col md:flex-row gap-10 text-sm">
          {/* Açıklama */}
          <div className="md:w-2/3">
              <h2 className="font-bold text-lg mb-3 border-b pb-1 text-slate-800">Ürün Açıklaması</h2>
              <p className="text-slate-600 leading-relaxed">
                  {product.description}
              </p>
          </div>
          
          {/* Ek Bilgiler */}
          <div className="md:w-1/3">
            <h2 className="font-bold text-lg mb-3 border-b pb-1 text-slate-800">Ek Bilgiler</h2>
            <ul className="space-y-2 text-slate-600">
              <li className="flex justify-between border-b border-dashed pb-1">
                <span className="font-medium text-slate-700">Kategori:</span>
                <span>{product.category}</span>
              </li>
              <li className="flex justify-between border-b border-dashed pb-1">
                <span className="font-medium text-slate-700">Marka:</span>
                <span>{product.brand}</span>
              </li>
              <li className="flex justify-between border-b border-dashed pb-1">
                <span className="font-medium text-slate-700">Bölge:</span>
                <span>{product.place.join(', ')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}