import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/kemuncak',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
