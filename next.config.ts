/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
    // Ya fir domains array use karein (simpler)
    domains: [
      'plus.unsplash.com',
      'images.unsplash.com',
      'randomuser.me',
      'cdn.dummyjson.com',
    ],
  },
}

module.exports = nextConfig