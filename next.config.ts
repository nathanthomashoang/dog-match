import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['frontend-take-home.fetch.com'],
  },
  // output: 'export',
  // basePath: '/your-repo-name',
  // trailingSlash: true,

  //TODO: REMOVE THIS WHEN DEPLOYING
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://frontend-take-home-service.fetch.com/:path*',
      },
    ];
  },
};

export default nextConfig;
