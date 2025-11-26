import type { NextConfig } from 'next';
import type { Rewrite } from 'next/dist/lib/load-custom-routes';

const nextConfig: NextConfig = {
  // Rewrites, sadece geliştirme ortamında (localhost) CORS hatasını atlatmak için kullanılır.
  async rewrites(): Promise<Rewrite[]> {
    return [
      {
        // 1. İsteğin geldiği yol (Örn: http://localhost:3000/api/auth/login)
        source: '/api/:path*', 
        // 2. İsteğin yönlendirileceği hedef URL (API sunucunuz)
        destination: 'http://34.61.30.58:8001/:path*', 
      },
    ];
  },
  // Diğer Next.js ayarlarınız buraya gelebilir...
};

export default nextConfig;