// next.config.ts

import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // TypeScript'i kullanırken NextConfig tipini kullanmak en iyisidir.
  
  // Rewrites fonksiyonunu ekliyoruz
  async rewrites() {
    return [
      {
        // 1. source: Tarayıcınızın yapacağı istek yolu
        // Artık frontend kodunuzda API'yi /api/ ile çağıracaksınız.
        source: '/api/:path*',
        
        // 2. destination: İsteğin gerçekte yönlendirileceği API adresi
        // :path* sayesinde /api/products -> http://34.61.30.58:8001/products'a gider.
        destination: 'http://34.61.30.58:8001/:path*',
      },
    ];
  },
  
  // Gerekliyse burada diğer Next.js ayarlarınız devam eder...
};

export default nextConfig;