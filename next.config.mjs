/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 85, 90, 100],
    deviceSizes: [640, 828, 1080, 1200, 1920, 2560],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brun-media.de',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.myshopify.com',
      },
    ],
  },
};

export default nextConfig;
