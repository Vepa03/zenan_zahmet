// app/admin/page.tsx
"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  productCategories,
  brands,
  Product,
  place_names,
} from "@/constants/product";
import { useProductsStore } from "@/constants/useProductsStore";
import { Trash2, Edit3 } from "lucide-react";

// dosyaları base64'e çeviren helper
const filesToBase64Array = (
  files: FileList,
  cb: (base64List: string[]) => void
) => {
  const arr = Array.from(files);
  const readers = arr.map(
    (file) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
  );

  Promise.all(readers).then(cb).catch(console.error);
};

const AdminPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } =
    useProductsStore();

  // Yeni ürün formu – place string olarak tutuluyor (tek seçim)
  const [form, setForm] = useState({
    name: "",
    category: productCategories[0] ?? "",
    brand: brands[0] ?? "",
    place: place_names[0] ?? "",
    price: "",
    oldPrice: "",
    description: "",
    images: [] as string[],
  });

  // Edit formu – yine place string
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    brand: "",
    place: "",
    price: "",
    oldPrice: "",
    description: "",
    images: [] as string[],
  });

  // ---------- ortak input handler ----------
  const handleFormChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
    isEdit = false
  ) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ---------- yeni ürün foto ----------
  const handleNewImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    filesToBase64Array(files, (imgs) => {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...imgs],
      }));
    });
  };

  const removeNewImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ---------- edit foto ----------
  const handleEditImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    filesToBase64Array(files, (imgs) => {
      setEditForm((prev) => ({
        ...prev,
        images: [...prev.images, ...imgs],
      }));
    });
  };

  const removeEditImage = (index: number) => {
    setEditForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ---------- yeni ürün submit ----------
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name ve price zorunlu");
      return;
    }

    const mainImage = form.images[0] ?? "/products/surat.png";

    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name: form.name,
      category: form.category || productCategories[0],
      brand: form.brand || brands[0],
      // Product.place: string[]  🔥
      place: [form.place || place_names[0]],
      image: mainImage,
      images: form.images.length > 1 ? form.images : undefined,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      currency: "USD",
      inStock: 1,
      rating: 0,
      reviewCount: 0,
      description: form.description || undefined,
    };

    addProduct(newProduct);

    setForm({
      name: "",
      category: productCategories[0] ?? "",
      brand: brands[0] ?? "",
      place: place_names[0] ?? "",
      price: "",
      oldPrice: "",
      description: "",
      images: [],
    });
  };

  // ---------- edit başlat ----------
  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditForm({
      name: p.name,
      category: p.category,
      brand: p.brand,
      // p.place: string[] | undefined → ilk elemanı alıyoruz
      place: p.place?.[0] ?? "",
      price: String(p.price),
      oldPrice: p.oldPrice ? String(p.oldPrice) : "",
      description: p.description ?? "",
      images: p.images ? [...p.images] : [p.image],
    });
  };

  // ---------- edit kaydet ----------
  const saveEdit = (e: FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    const mainImage = editForm.images[0] ?? "/products/surat.png";

    updateProduct(editingId, {
      name: editForm.name,
      category: editForm.category,
      brand: editForm.brand,
      // yine diziye çeviriyoruz
      place: [editForm.place || place_names[0]],
      price: Number(editForm.price),
      oldPrice: editForm.oldPrice
        ? Number(editForm.oldPrice)
        : undefined,
      description: editForm.description || undefined,
      image: mainImage,
      images:
        editForm.images.length > 1 ? editForm.images : undefined,
    });

    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu ürünü silmek istiyor musun?")) {
      deleteProduct(id);
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <h1 className="text-2xl font-semibold mb-2">
          Admin – Product Management
        </h1>

        {/* YENİ ÜRÜN FORMU */}
        <section className="bg-white rounded-3xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-3">
            New Product
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-4 gap-4 text-sm"
          >
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={(e) => handleFormChange(e)}
                className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={(e) => handleFormChange(e)}
                className="w-full border rounded-xl px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
              >
                {productCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Brand / Gender
              </label>
              <select
                name="brand"
                value={form.brand}
                onChange={(e) => handleFormChange(e)}
                className="w-full border rounded-xl px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
              >
                {brands.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Place / Ýer
              </label>
              <select
                name="place"
                value={form.place}
                onChange={(e) => handleFormChange(e)}
                className="w-full border rounded-xl px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
              >
                {place_names.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={(e) => handleFormChange(e)}
                className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Old Price
              </label>
              <input
                name="oldPrice"
                type="number"
                value={form.oldPrice}
                onChange={(e) => handleFormChange(e)}
                className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={(e) => handleFormChange(e)}
                rows={2}
                className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-medium mb-1">
                Photos (multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleNewImages}
              />

              {form.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 border rounded-lg overflow-hidden"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(i)}
                        className="absolute top-0 right-0 bg-black/70 text-white text-[10px] px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
              >
                Add Product
              </button>
            </div>
          </form>
        </section>

        {/* EDIT FORMU */}
        {editingId && (
          <section className="bg-white rounded-3xl shadow-sm p-5">
            <h2 className="text-lg font-semibold mb-3">
              Edit Product
            </h2>
            <form
              onSubmit={saveEdit}
              className="grid md:grid-cols-4 gap-4 text-sm"
            >
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={(e) => handleFormChange(e, true)}
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={(e) => handleFormChange(e, true)}
                  className="w-full border rounded-xl px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {productCategories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Brand / Gender
                </label>
                <select
                  name="brand"
                  value={editForm.brand}
                  onChange={(e) => handleFormChange(e, true)}
                  className="w-full border rounded-xl px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {brands.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Place / Ýer
                </label>
                <select
                  name="place"
                  value={editForm.place}
                  onChange={(e) => handleFormChange(e, true)}
                  className="w-full border rounded-xl px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {place_names.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Price
                </label>
                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={(e) => handleFormChange(e, true)}
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Old Price
                </label>
                <input
                  name="oldPrice"
                  type="number"
                  value={editForm.oldPrice}
                  onChange={(e) => handleFormChange(e, true)}
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={(e) => handleFormChange(e, true)}
                  rows={2}
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-medium mb-1">
                  Photos (add/remove)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleEditImages}
                />

                {editForm.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {editForm.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-16 h-16 border rounded-lg overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeEditImage(i)}
                          className="absolute top-0 right-0 bg-black/70 text-white text-[10px] px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-4 flex gap-3 justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl border text-sm font-semibold hover:bg-slate-100 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-xl border text-sm hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Admin ürün listesi */}
        <section className="bg-white rounded-3xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-3">
            All Products ({products.length})
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {products.map((p) => (
              <div
                key={p.id}
                className="border rounded-2xl p-3 flex flex-col gap-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-32 object-contain rounded-xl bg-slate-50"
                />
                <div className="font-semibold line-clamp-2">
                  {p.name}
                </div>
                <div className="text-xs text-slate-500">
                  {p.category} • {p.brand}
                  {p.place && ` • ${p.place.join(", ")}`}
                </div>
                <div className="font-bold text-emerald-700">
                  {p.price.toFixed(2)} TM
                </div>
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    className="flex-1 flex items-center justify-center gap-1 border rounded-lg py-1 text-xs hover:bg-slate-100"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 flex items-center justify-center gap-1 border rounded-lg py-1 text-xs text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
