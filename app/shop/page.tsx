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
          selectedBrands.length === 0 || selectedBrands.includes(p.brand);
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
          {/* Sidebar */}
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

          {/* Grid */}
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
                          Hot
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

                  {/* Kartın tıklanabilir kısmı */}
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
