import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fcnynssxwkftaifedyml.supabase.co',
      },
    ],
  },
};

export default nextConfig;
