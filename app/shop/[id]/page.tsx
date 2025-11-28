// app/shop/[id]/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // usePathname EKLENDİ
import { Product } from "@/constants/product"; 
import { useProductsStore } from "@/constants/useProductsStore";
import { Heart, Phone, Loader2 } from "lucide-react"; 

// Hata veren PageProps tanımı ve params kullanımı kaldırıldı, ancak 
// PageProps'u tutmak zorunda olsaydınız, parametresiz bileşen tanımını kullanıyoruz:

export default function ProductDetailPage() { // Props kaldırıldı
  const router = useRouter();
  
  // 💡 DÜZELTME: ID'yi usePathname ile güvenli bir şekilde alıyoruz
  const pathname = usePathname();
  const id = useMemo(() => pathname.split('/').pop() || '', [pathname]);

  // Zustand Store'dan ürünleri, yükleme durumunu ve veri çekme fonksiyonunu al
  const products = useProductsStore((state) => state.products);
  const isLoading = useProductsStore((state) => state.isLoading);
  const fetchProductsData = useProductsStore((state) => state.fetchProductsData);

  // Veri çekme mantığı
  useEffect(() => {
    // Sadece ürünler yüklenmediyse ve yükleme devam etmiyorsa veriyi çek
    if (products.length === 0 && !isLoading) {
      fetchProductsData();
    }
  }, [products.length, isLoading, fetchProductsData]);


  // State'ler
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Ürünü ID ile bulma
  const product: Product | undefined = useMemo(
    () => products.find((p) => String(p.id) === id),
    [products, id]
  );
  
  // --- Sabitler ve Görsel Galeri (useMemo ile optimize edildi) ---
  const gallery: string[] = useMemo(() => {
    if (!product) return [];
    
    const multiImages = 
      product.images && product.images.length > 0 
        ? product.images.map(img => `/api/${img.image}`) 
        : [];
    
    return multiImages.length > 0 ? multiImages : [product.image];
  }, [product]);

  // Seçili Görsel State'i ve Başlangıç Değeri Ayarlama
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined); 

  useEffect(() => {
    if (product && gallery.length > 0 && selectedImage === undefined) {
      setSelectedImage(gallery[0]);
    }
  }, [product, gallery, selectedImage]);
  
  // Varsayılan düğme ayarları
  const defaultButtons = {
    addToCart: true,
    wishlist: true,
    compareColor: true,
    askQuestion: true,
    deliveryReturnInfo: true,
    share: true,
  };
  const buttons = defaultButtons; 

  // --- GUARD CLAUSE'lar ---

  if (isLoading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-xl text-slate-500">Ürünler yükleniyor...</div>
      </div>
    );
  }
  
  // Eğer ID boşsa (URL /shop/ ise) veya ürün bulunamazsa
  if (!product || id === '') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-sm text-center space-y-3">
          <h1 className="text-xl font-semibold">
            {id ? `Ürün bulunamadı (ID: ${id})` : "Ürün ID'si belirtilmedi."}
          </h1>
          <button
            onClick={() => router.push("/shop")}
            className="px-4 py-2 text-sm rounded-full bg-emerald-700 text-white hover:bg-emerald-800"
          >
            Ürünlere geri dön
          </button>
        </div>
      </div>
    );
  }

  // selectedImage'ın yüklenmesini beklerken (API'den geldiği için)
  if (selectedImage === undefined) {
       return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
            <Loader2 className="w-8 h-8 mr-3 animate-spin text-emerald-600" />
        </div>
       )
  }
  
  // --- Sepete Ekleme Fonksiyonu (Aynı Kalır) ---
  const handleAddToCart = async () => {
    setIsAdding(true);
    setMessage(null);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setMessage("Sepete eklemek için lütfen önce giriş yapın.");
      setIsAdding(false);
      return;
    }

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
            setMessage(errorData.detail || "Sepete eklenirken bir hata oluştu.");
        }
      }
    } catch (err) {
      setMessage("Ağ hatası: Sunucuya ulaşılamadı. CORS/Proxy ayarlarınızı kontrol edin.");
    } finally {
      setIsAdding(false);
    }
  };
  // --- Fonksiyon Sonu ---


  // 4. Ana Render (Return) Bloğu (Aynı Kalır)
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm p-6 md:p-8 flex flex-col gap-8">
        {/* ÜST BLOK */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* SOL: ANA GÖRSEL + THUMBNAILS */}
          <div className="flex-1">
            <div className="relative w-full aspect-[4/3] border rounded-2xl bg-[#fafafa] flex items-center justify-center">
              <Image
                // selectedImage artık undefined olmamalı
                src={selectedImage}
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
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
              {product.title} 
            </h1>

            <p className="text-sm text-slate-500">
              {product.description ??
                "Bu ürün hakkında detaylı bir açıklama yakında eklenecektir."}
            </p>

            {/* Fiyat */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-emerald-700">
                {Number(product.price).toFixed(2)} TM
              </span>
              {product.oldPrice && (
                <span className="text-base text-slate-400 line-through">
                  {product.oldPrice.toFixed(2)} TM
                </span>
              )}
            </div>

            {/* Brand / stok */}
            <div className="text-xs text-slate-500">
              Jynsy: {" "}
              <span className="font-medium">{product.brand}</span>
            </div>

            {/* Mesaj/Hata Gösterimi */}
            {message && (
                <div className={`p-3 rounded-xl text-sm ${message.includes('başarıyla') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}


            {/* Ana Butonlar */}
            <div className="mt-2 flex items-center gap-3">
              
              {/* SEPETE EKLE BUTONU */}
              {buttons.addToCart && (
                <button 
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 px-6 py-3 text-base rounded-2xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {isAdding ? "Ekleniyor..." : "Sepete Ekle"}
                </button>
              )}

              {buttons.wishlist && (
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition">
                  <Heart className="w-5 h-5" />
                </button>
              )}

              {buttons.askQuestion && ( 
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition" >
                  <Phone className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ALT BLOK */}
        <div className="border-t pt-6 flex flex-col md:flex-row gap-8 text-sm">
          {/* Açıklama */}
          <div className="flex-1">
              <h2 className="font-semibold mb-2 text-base">Ürün Açıklaması</h2>
              <p className="text-slate-600 leading-relaxed">
                  {product.description}
              </p>
          </div>
          
          {/* Ek Bilgiler */}
          <div className="flex-1">
            <p className="font-semibold mb-2">Ek Bilgiler</p>
            <ul className="space-y-1 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>Kategori: {product.category}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>Bölge: {product.place.join(', ')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}