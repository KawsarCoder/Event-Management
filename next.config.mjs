/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";

const nextConfig = withPlaiceholder({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
});

export default nextConfig;
