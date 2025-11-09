// data/products.ts

export type DeliveryInfo = {
  freeDelivery: boolean;
  returnPolicy: string;
  postalCodeRequired: boolean;
};

export type ProductButtons = {
  addToCart: boolean;
  wishlist: boolean;
  compareColor: boolean;
  askQuestion: boolean;
  deliveryReturnInfo: boolean;
  share: boolean;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string; // ana görsel (card için)
  images?: string[]; // detay için galeri
  price: number;
  oldPrice?: number;
  currency: string;
  inStock: number;
  rating: number;
  reviewCount: number;
  isHot?: boolean;
  onSale?: boolean;
  // detay sayfası için opsiyonel
  description?: string;
  features?: string[];
  delivery?: DeliveryInfo;
  buttons?: ProductButtons;
};

export const productCategories: string[] = [
  "Kitchen Appliances",
  "Television",
  "Refrigerators",
  "Washing Machine",
  "Tablets",
  "Gadget Accessories",
  "Appliances",
  "Air Conditioners",
  "Airbuds",
  "Cameras",
  "Smartphones",
  "Mobiles",
  "Smart Watches",
];

export const brands: string[] = [
  "Hi-Tech Limited",
  "hp Limited",
  "The Apple Limited",
  "A4 Tech",
  "The Hitachi Limited",
  "Huawei Company",
  "IKEA Limited",
  "Sony Limited",
];

export const products: Product[] = [
  {
    id: "tv-1",
    name: '43" Class TU7000 Series 4K UHD Smart TV',
    category: "Television",
    brand: "Hi-Tech Limited",
    image: "/products/tv-1.png",
    price: 1599.0,
    oldPrice: 1678.95,
    currency: "USD",
    inStock: 30,
    rating: 4.8,
    reviewCount: 5,
    isHot: true,
  },
  {
    id: "airpods-3",
    name: "Apple AirPods 3rd generation",
    category: "Airbuds",
    brand: "The Apple Limited",
    image: "/products/airpods-3.png",
    price: 1700.0,
    oldPrice: 1870.0,
    currency: "USD",
    inStock: 9,
    rating: 4.9,
    reviewCount: 5,
    isHot: true,
  },
  {
    id: "airpods-max",
    name: "Apple AirPods Max",
    category: "Airbuds",
    brand: "The Apple Limited",
    image: "/products/airpods-max.png",
    price: 699.0,
    oldPrice: 768.9,
    currency: "USD",
    inStock: 6,
    rating: 4.8,
    reviewCount: 5,
    isHot: true,
  },
  {
    id: "mac-mini",
    name: "Apple Mac Mini M4 Chip",
    category: "Gadget Accessories",
    brand: "The Apple Limited",
    image: "/products/mac-mini.png",
    price: 600.0,
    oldPrice: 660.0,
    currency: "USD",
    inStock: 61,
    rating: 4.7,
    reviewCount: 5,
    isHot: true,
  },
  {
    id: "watch-1",
    name: "Smart Watch X Pro",
    category: "Smart Watches",
    brand: "Huawei Company",
    image: "/products/watch-1.png",
    price: 299.0,
    oldPrice: 349.0,
    currency: "USD",
    inStock: 15,
    rating: 4.6,
    reviewCount: 18,
    onSale: true,
  },
  {
    id: "watch-2",
    name: "Smart Watch Active",
    category: "Smart Watches",
    brand: "Sony Limited",
    image: "/products/watch-2.png",
    price: 259.0,
    oldPrice: 310.0,
    currency: "USD",
    inStock: 21,
    rating: 4.5,
    reviewCount: 12,
    onSale: true,
  },
  {
    id: "fridge-1",
    name: "Double Door Refrigerator 380L",
    category: "Refrigerators",
    brand: "The Hitachi Limited",
    image: "/products/fridge-1.png",
    price: 899.0,
    oldPrice: 999.0,
    currency: "USD",
    inStock: 8,
    rating: 4.4,
    reviewCount: 9,
    onSale: true,
  },
  {
    id: "camera-250d",
    name: "Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18–55mm",
    category: "Cameras",
    brand: "Hi-Tech Limited",
    image: "/products/canon-eos-250d-main.jpg",
    images: [
      "/products/canon-eos-250d-main.jpg",
      "/products/speaker-red.jpg",
      "/products/echo-dot.jpg",
      "/products/camera-kit.jpg",
      "/products/iphone-red.jpg",
    ],
    price: 750.0,
    oldPrice: 810.0,
    currency: "USD",
    inStock: 12,
    rating: 4.8,
    reviewCount: 120,
    onSale: true,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex unde illum expedita dolores aut nostrum, quidem placeat laborum nemo, beatae perspiciatis quae, sint tempore aliquid molestiae consequatur eum earum.",
    features: [
      "24.1MP APS-C CMOS Sensor",
      "Dual Pixel CMOS AF with Eye Detection",
      "DIGIC 8 Image Processor",
      "4K Video Recording",
      "Wi-Fi and Bluetooth Connectivity",
      "Optical Viewfinder",
    ],
    delivery: {
      freeDelivery: true,
      returnPolicy: "30 days Delivery Returns",
      postalCodeRequired: true,
    },
    buttons: {
      addToCart: true,
      wishlist: true,
      compareColor: true,
      askQuestion: true,
      deliveryReturnInfo: true,
      share: true,
    },
  },
];
