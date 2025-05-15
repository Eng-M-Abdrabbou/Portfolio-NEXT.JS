/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning instead of error during production builds
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;