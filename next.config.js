
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Generates static HTML/CSS/JS
  trailingSlash: true, // Add trailing slashes to all URLs
  images: {
    unoptimized: true, // For static export
  },
  // Ensure we can use public directory assets
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
};

module.exports = nextConfig;
