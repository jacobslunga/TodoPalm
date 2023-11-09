/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "lh4.googleusercontent.com",
      },
      {
        hostname: "lh5.googleusercontent.com",
      },
      {
        hostname: "lh6.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
