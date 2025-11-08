export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  variant: string; // filtre buna göre
  image: string;
  categories?: string[];
  inStock?: boolean;
};

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Basic White T-Shirt",
    description: "Minimal günlük kullanım için rahat beyaz tişört.",
    price: 19.99,
    variant: "tshirt",
    image: "/products/tshirt-basic.jpg",
    categories: ["Clothing", "Unisex"],
    inStock: true,
  },
  {
    id: "2",
    name: "Premium Black T-Shirt",
    description: "Daha kalın kumaş, premium his.",
    price: 29.99,
    variant: "tshirt",
    image: "/products/tshirt-premium.jpg",
    categories: ["Clothing"],
    inStock: true,
  },
  {
    id: "3",
    name: "White Ceramic Mug",
    description: "Logon için sade kupa.",
    price: 12.5,
    variant: "mug",
    image: "/products/mug-white.jpg",
    categories: ["Accessories"],
    inStock: true,
  },
  {
    id: "4",
    name: "Black Ceramic Mug",
    description: "Gece modu sevenlere siyah kupa.",
    price: 13.9,
    variant: "mug",
    image: "/products/mug-black.jpg",
    categories: ["Accessories"],
    inStock: false,
  },
];
