// next.config.ts
import type { NextConfig } from 'next';
import type { Rewrite } from 'next/dist/lib/load-custom-routes';

const nextConfig: NextConfig = {
  async rewrites(): Promise<Rewrite[]> {
    return [
      {
        // Uygulamanızda kullanacağınız yol
        source: '/api/:path*', 
        // Gerçek API adresiniz
        destination: 'http://34.61.30.58:8001/:path*', 
      },
    ];
  },
  // ...
};

export default nextConfig;