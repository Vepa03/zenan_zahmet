// components/CategoryFilter.tsx

import { HierarchicalCategory } from '@/types';
import React from 'react';

// --- Yardımcı Bileşen: CategoryTree (Hiyerarşiyi yönetir) ---
interface CategoryTreeProps {
    categories: HierarchicalCategory[];
    selectedCategory: string | null;
    onSelectCategory: (categoryName: string | null) => void;
    // Girintileme derinliği
    level: number; 
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ 
    categories, 
    selectedCategory, 
    onSelectCategory,
    level
}) => {
    
    // Girintileme için Tailwind sınıfı (pl-4, pl-8, pl-12)
    const paddingClass = level > 0 ? `pl-${level * 4}` : 'pl-0'; 
    
    return (
        <ul className="space-y-2">
            {categories.map((category) => (
                <React.Fragment key={category.id}>
                    <li className={`text-sm ${paddingClass} ${level > 0 ? 'mt-2' : ''}`}>
                        <label className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition">
                            <input
                                type="checkbox"
                                // name alanını filtreleme değeri olarak kullanıyoruz
                                checked={selectedCategory === category.name} 
                                onChange={() => onSelectCategory(category.name)}
                                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className={level === 0 ? 'font-semibold' : 'font-normal'}>
                                {category.name}
                            </span>
                        </label>
                    </li>
                    
                    {/* Eğer alt kategoriler varsa, yinelemeli olarak CategoryTree çağır */}
                    {category.children.length > 0 && (
                        <li>
                            <CategoryTree
                                categories={category.children}
                                selectedCategory={selectedCategory}
                                onSelectCategory={onSelectCategory}
                                level={level + 1}
                            />
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};


// --- Ana Bileşen: CategoryFilter ---

interface CategoryFilterProps {
  categories: HierarchicalCategory[]; 
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
    
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 sticky top-4">
      
      <h3 className="text-base font-bold text-gray-800 mb-3">Kateqoriyalar</h3>
      
      {/* Bütün Ürünler seçeneği */}
      <div className="mb-4">
          <label className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition">
              <input
                  type="checkbox"
                  checked={selectedCategory === null}
                  onChange={() => onSelectCategory(null)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="font-bold">**Bütün Ürünler**</span>
          </label>
      </div>
      
      <hr className="my-5 border-gray-200" />
      
      {/* Kategori ağacını başlat */}
      <CategoryTree
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        level={0}
      />
      
    </div>
  );
};

export default CategoryFilter;