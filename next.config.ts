import type { NextConfig } from 'next';

const githubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: githubPages ? 'export' : undefined,
  basePath: githubPages ? '/puice2026utama' : '',
  assetPrefix: githubPages ? '/puice2026utama' : undefined,
  env: { NEXT_PUBLIC_BASE_PATH: githubPages ? '/puice2026utama' : '' },
  trailingSlash: githubPages,
  images: githubPages ? { unoptimized: true } : undefined,
  ...(githubPages ? {} : { async redirects() {
    return [
      {
        source: '/',
        destination: '/kemuncak',
        permanent: false,
      },
    ];
  } }),
};

export default nextConfig;
