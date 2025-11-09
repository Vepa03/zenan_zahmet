// data/shop.ts

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
  description: string;
  price: number;
  oldPrice: number;
  currency: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  variant: string;
  images: string[];
  features: string[];
  delivery: DeliveryInfo;
  buttons: ProductButtons;
};

export const shop: Product[] = [
  {
    id: "1",
    name: "Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18–55mm",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex unde illum expedita dolores aut nostrum, quidem placeat laborum nemo, beatae perspiciatis quae, sint tempore aliquid molestiae consequatur eum earum.",
    price: 750.0,
    oldPrice: 810.0,
    currency: "USD",
    inStock: true,
    rating: 4.8,
    reviewCount: 120,
    variant: "camera",
    images: [
      "/images/banner/surat.png",
      "/images/banner/surat.png",
      "/images/banner/surat.png",
      "/images/banner/surat.png",
      "/images/banner/surat.png",
    ],
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
