import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['frontend-take-home.fetch.com'],
  },

  //NOTE: I have this here to make it easier to authenticate and it should not impact deployment or usage for this proof of concept
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
