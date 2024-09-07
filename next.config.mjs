import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: path.resolve('src/app'),
  },
};

export default nextConfig;
