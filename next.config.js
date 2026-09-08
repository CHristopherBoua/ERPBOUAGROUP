import path from 'node:path';
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Use absolute path to avoid Turbopack warning on Vercel
    root: path.resolve(),
  },
};

export default nextConfig;
