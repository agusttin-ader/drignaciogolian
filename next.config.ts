import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.195.183"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
