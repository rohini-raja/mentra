/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Pure static — no server needed
  trailingSlash: true, // Better for static hosting
  images: {
    unoptimized: true, // No image optimization server needed
  },
}

module.exports = nextConfig
