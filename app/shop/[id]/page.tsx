// app/shop/[id]/page.tsx
"use client";

import { use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/constants/product";
import { useProductsStore } from "@/constants/useProductsStore";
import { Heart, Phone } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>; // Next 15 pattern
};

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();

  // Next 15 / React 19: params bir Promise, use ile çözüyoruz
  const { id } = use(params);

  // Ürünü STORE'dan buluyoruz (artık admin'den eklenenler de burada)
  const product: Product | undefined = useProductsStore((state) =>
    state.products.find((p) => p.id === id)
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-sm text-center space-y-3">
          <h1 className="text-xl font-semibold">Product not found</h1>
          <button
            onClick={() => router.push("/shop")}
            className="px-4 py-2 text-sm rounded-full bg-emerald-700 text-white hover:bg-emerald-800"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  // Galeri: varsa product.images, yoksa sadece product.image
  const gallery: string[] =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  const buttons = product.buttons ?? {
    addToCart: true,
    wishlist: true,
    compareColor: true,
    askQuestion: true,
    deliveryReturnInfo: true,
    share: true,
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm p-6 md:p-8 flex flex-col gap-8">
        {/* ÜST BLOK */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* SOL: ANA GÖRSEL + THUMBNAILS */}
          <div className="flex-1">
            <div className="relative w-full aspect-[4/3] border rounded-2xl bg-[#fafafa] flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                unoptimized
                className="object-contain p-6"
                priority
              />
            </div>

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
                  {/* küçükler için de Image kullanıyoruz ama istersen <img> yapabilirsin */}
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SAĞ: ÜRÜN BİLGİLERİ */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
              {product.name}
            </h1>

            <p className="text-sm text-slate-500">
              {product.description ??
                "High-quality product with modern design and reliable performance."}
            </p>

            {/* Fiyat */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-emerald-700">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-base text-slate-400 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Brand / stok */}
            <div className="text-xs text-slate-500">
              Brand:{" "}
              <span className="font-medium">{product.brand}</span>
              {product.inStock !== undefined && (
                <>
                  {" • "}
                  In stock:{" "}
                  <span className="font-medium">{product.inStock}</span>
                </>
              )}
            </div>

            {/* Ana Butonlar */}
            <div className="mt-2 flex items-center gap-3">
              {buttons.addToCart && (
                <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-emerald-700 text-white text-sm font-semibold shadow-sm hover:bg-emerald-800 transition">
                  Add to Cart
                </button>
              )}

              {buttons.wishlist && (
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition">
                  <Heart className="w-5 h-5" />
                </button>
              )}

              {buttons.wishlist && (
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition" >
                  <a></a>
                  <Phone className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ALT BLOK */}
        <div className="border-t pt-6 flex flex-col md:flex-row gap-8 text-sm">
          {/* Özellikler */}
          <div className="flex-1">
            {product.features && product.features.length > 0 && (
              <>
                <p className="font-semibold mb-2">
                  {product.name}: Characteristics
                </p>
                <ul className="space-y-1 text-slate-600">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
