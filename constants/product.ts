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
  image: string;
  images?: string[];
  price: number;
  oldPrice?: number;
  currency: string;
  inStock: number;
  rating: number;
  reviewCount: number;
  isHot?: boolean;
  onSale?: boolean;
  description?: string;
  features?: string[];
  delivery?: DeliveryInfo;
  buttons?: ProductButtons;
  phone?: number; 
  place?: string[];
};

export const productCategories: string[] = [
  "El işleri",
  "Köýnekler",
  "Matalar",
  "Ýakalar",
  "Tahýalar",
];

export const place_names: string[] = [
  "Mary",
  "Balkan",
  "Lebap",
  "Ashgabat",
  "Ahal",
  "Dashoguz",
];

export const brands: string[] = [
  "gyz",
  "oglan"
];

export const products: Product[] = [
  {
    id: "tv-1",
    name: '43" Class TU7000 Series 4K UHD Smart TV',
    category: "El işleri",
    brand: "gyz",
    image: "/products/surat.png",
    price: 1599.0,
    oldPrice: 1678.95,
    currency: "USD",
    inStock: 30,
    rating: 4.8,
    reviewCount: 5,
    isHot: true,
    phone: +99361831001,
  },
  {
    id: "airpods-3",
    name: "Apple AirPods 3rd generation",
    category: "El işleri",
    brand: "gyz",
    image: "/products/surat.png",
    price: 1700.0,
    oldPrice: 1870.0,
    currency: "USD",
    inStock: 9,
    rating: 4.9,
    reviewCount: 5,
    isHot: true,
    phone: +99361831001,
  },
  {
    id: "airpods-max",
    name: "Apple AirPods Max",
    category: "Köýnekler",
    brand: "oglan",
    image: "/products/surat.png",
    price: 699.0,
    oldPrice: 768.9,
    currency: "USD",
    inStock: 6,
    rating: 4.8,
    reviewCount: 5,
    isHot: true,
    phone: +99361831001,
  },
  {
    id: "mac-mini",
    name: "Apple Mac Mini M4 Chip",
    category: "Köýnekler",
    brand: "oglan",
    image: "/products/surat.png",
    price: 600.0,
    oldPrice: 660.0,
    currency: "USD",
    inStock: 61,
    rating: 4.7,
    reviewCount: 5,
    isHot: true,
    phone: +99361831001,
  },
  {
    id: "watch-1",
    name: "Smart Watch X Pro",
    category: "Matalar",
    brand: "gyz",
    image: "/products/surat.png",
    price: 299.0,
    oldPrice: 349.0,
    currency: "USD",
    inStock: 15,
    rating: 4.6,
    reviewCount: 18,
    onSale: true,
    phone: +99361831001,
  },
  {
    id: "watch-2",
    name: "Smart Watch Active",
    category: "Matalar",
    brand: "gyz",
    image: "/products/surat.png",
    price: 259.0,
    oldPrice: 310.0,
    currency: "USD",
    inStock: 21,
    rating: 4.5,
    reviewCount: 12,
    onSale: true,
    phone: +99361831001,
  },
  {
    id: "fridge-1",
    name: "Double Door Refrigerator 380L",
    category: "Tahýalar",
    brand: "oglan",
    image: "/products/surat.png",
    price: 899.0,
    oldPrice: 999.0,
    currency: "USD",
    inStock: 8,
    rating: 4.4,
    reviewCount: 9,
    onSale: true,
    phone: +99361831001,
  },
  {
    id: "camera-250d",
    name: "Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18–55mm",
    category: "Tahýalar",
    brand: "oglan",
    image: "/products/surat.png",
    images: [
      "/products/surat.png",
      "/products/surat.png",
      "/products/surat.png",
      "/products/surat.png",
      "/products/surat.png",
    ],
    price: 750.0,
    oldPrice: 810.0,
    currency: "USD",
    inStock: 12,
    rating: 4.8,
    reviewCount: 120,
    onSale: true,
    phone: +99361831001,
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
