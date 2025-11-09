// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { shop } from "@/constants/shop";
// import {
//   Heart,
//   SlidersHorizontal,
//   MessageCircleQuestion,
//   Truck,
//   RefreshCw,
//   Share2,
// } from "lucide-react";

// const ShopPage = () => {
//   const product = shop[0];
//   const [selectedImage, setSelectedImage] = useState(product.images[0]);

//   return (
//     <div className="min-h-screen bg-[#f5f5f5] flex justify-center py-10">
//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm p-6 md:p-8 flex flex-col gap-8">
//         {/* ÜST BLOK */}
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* SOL: ANA FOTO + THUMBNAIL */}
//           <div className="flex-1">
//             <div className="relative w-full aspect-[4/3] border rounded-2xl bg-[#fafafa] flex items-center justify-center">
//               <Image
//                 src={selectedImage}
//                 alt={product.name}
//                 fill
//                 className="object-contain p-6"
//                 priority
//               />
//             </div>

//             <div className="mt-4 flex gap-3 overflow-x-auto">
//               {product.images.map((img) => (
//                 <button
//                   key={img}
//                   onClick={() => setSelectedImage(img)}
//                   className={`relative h-20 w-20 flex-shrink-0 border rounded-2xl bg-[#fafafa] overflow-hidden transition
//                   ${
//                     selectedImage === img
//                       ? "ring-2 ring-emerald-600 border-transparent"
//                       : "hover:border-emerald-600/70"
//                   }`}
//                 >
//                   <Image
//                     src={img}
//                     alt={product.name}
//                     fill
//                     className="object-contain p-2"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* SAĞ: ÜRÜN BİLGİLERİ */}
//           <div className="flex-1 flex flex-col gap-4">
//             <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
//               {product.name}
//             </h1>

//             <p className="text-sm text-slate-500">
//               {product.description}
//             </p>

//             {/* RATING */}
//             <div className="flex items-center gap-2 text-sm">
//               <div className="flex gap-0.5">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <span key={i} className="text-emerald-500">
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <span className="font-medium text-slate-800">
//                 {product.rating}
//               </span>
//               <span className="text-slate-400">
//                 ({product.reviewCount})
//               </span>
//             </div>

//             {/* FİYAT */}
//             <div className="flex items-baseline gap-3">
//               <span className="text-3xl font-semibold text-emerald-700">
//                 {product.currency} {product.price.toFixed(2)}
//               </span>
//               <span className="text-base text-slate-400 line-through">
//                 {product.currency} {product.oldPrice.toFixed(2)}
//               </span>
//             </div>

//             {/* STOK BADGE */}
//             {product.inStock && (
//               <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
//                 ● In Stock
//               </span>
//             )}

//             {/* BUTONLAR */}
//             <div className="mt-2 flex items-center gap-3">
//               {product.buttons.addToCart && (
//                 <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-emerald-700 text-white text-sm font-semibold shadow-sm hover:bg-emerald-800 transition">
//                   Add to Cart
//                 </button>
//               )}

//               {product.buttons.wishlist && (
//                 <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition">
//                   <Heart className="w-5 h-5" />
//                 </button>
//               )}
//             </div>

//             {/* ALT AKSİYONLAR */}
//             <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate-600">
//               {product.buttons.compareColor && (
//                 <button className="inline-flex items-center gap-2 hover:text-emerald-600">
//                   <SlidersHorizontal className="w-4 h-4" />
//                   Compare color
//                 </button>
//               )}

//               {product.buttons.askQuestion && (
//                 <button className="inline-flex items-center gap-2 hover:text-emerald-600">
//                   <MessageCircleQuestion className="w-4 h-4" />
//                   Ask a question
//                 </button>
//               )}

//               {product.buttons.deliveryReturnInfo && (
//                 <button className="inline-flex items-center gap-2 hover:text-emerald-600">
//                   <Truck className="w-4 h-4" />
//                   Delivery & Return
//                 </button>
//               )}

//               {product.buttons.share && (
//                 <button className="inline-flex items-center gap-2 hover:text-emerald-600">
//                   <Share2 className="w-4 h-4" />
//                   Share
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ALT BLOK: ÖZELLİKLER + KARGO */}
//         <div className="border-t pt-6 flex flex-col md:flex-row gap-8 text-sm">
//           {/* Özellikler */}
//           <div className="flex-1">
//             <p className="font-semibold mb-2">
//               Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18–55mm:
//               Characteristics
//             </p>
//             <ul className="space-y-1 text-slate-600">
//               {product.features.map((feature) => (
//                 <li key={feature} className="flex items-start gap-2">
//                   <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
//                   <span>{feature}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Kargo & İade */}
//           <div className="w-full md:w-64 space-y-4">
//             <div className="flex gap-3 items-start">
//               <Truck className="w-5 h-5 mt-0.5" />
//               <div>
//                 <div className="font-semibold">Free Delivery</div>
//                 <p className="text-xs text-slate-500">
//                   {product.delivery.freeDelivery
//                     ? "Enter your Postal code for Delivery Availability."
//                     : "Delivery cost is calculated at checkout."}
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-3 items-start">
//               <RefreshCw className="w-5 h-5 mt-0.5" />
//               <div>
//                 <div className="font-semibold">Return Delivery</div>
//                 <p className="text-xs text-slate-500">
//                   {product.delivery.returnPolicy}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopPage;

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  products,
  productCategories,
  brands,
  Product,
} from "@/constants/product";
import { Heart, ShoppingCart, Flame } from "lucide-react";

const ShopPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleInArray = (arr: string[], value: string): string[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => toggleInArray(prev, category));
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => toggleInArray(prev, brand));
  };

  const filteredProducts: Product[] = useMemo(
    () =>
      products.filter((p) => {
        const byCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(p.category);
        const byBrand =
          selectedBrands.length === 0 ||
          selectedBrands.includes(p.brand);
        return byCategory && byBrand;
      }),
    [selectedCategories, selectedBrands]
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">
          GET THE PRODUCTS AS YOUR NEEDS
        </h1>

        <div className="flex gap-6">
          {/* SIDEBAR */}
          <aside className="hidden md:block w-64 bg-white rounded-3xl shadow-sm p-5 space-y-6">
            <div>
              <h2 className="font-semibold mb-3">Product Categories</h2>
              <div className="space-y-2 text-sm text-slate-700 max-h-64 overflow-y-auto pr-1">
                {productCategories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-3">Brands</h2>
              <div className="space-y-2 text-sm text-slate-700 max-h-56 overflow-y-auto pr-1">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* GRID */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col border border-slate-100"
                >
                  <div className="flex items-center justify-between px-3 pt-3">
                    <div>
                      {product.isHot && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] rounded-full bg-orange-50 text-orange-500 font-semibold">
                          <Flame className="w-3 h-3" />
                        </span>
                      )}
                      {product.onSale && !product.isHot && (
                        <span className="inline-flex items-center px-2 py-1 text-[10px] rounded-full bg-emerald-50 text-emerald-600 font-semibold">
                          Sale!
                        </span>
                      )}
                    </div>
                    <button className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-600 transition">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* TIKLANABİLİR BÖLGE */}
                  <Link
                    href={`/shop/${product.id}`}
                    className="flex-1 flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/3] mt-1">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>

                    <div className="px-4 pb-2 flex flex-col gap-1 text-sm">
                      <p className="text-[10px] uppercase text-slate-400 tracking-widest">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-slate-800 leading-snug line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 text-[10px] mt-1">
                        <span className="text-emerald-500">★★★★★</span>
                        <span className="text-slate-500">
                          {product.reviewCount} Reviews
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] mt-1">
                        <span className="text-slate-500">In Stock</span>
                        <span className="font-semibold text-slate-800">
                          {product.inStock}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-[17px] font-semibold text-emerald-700">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Add to Cart (kart içinde kalır) */}
                  <div className="px-4 pb-4">
                    <button className="mt-1 flex items-center justify-center gap-2 w-full py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-10 text-center text-slate-500">
                No products match the selected filters.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;


