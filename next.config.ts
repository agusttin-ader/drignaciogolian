import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.195.183"],
  // Evita que el framework regenere archivos de instrucciones en la raíz.
  agentRules: false,
  images: {
    // Las imágenes ya se sirven pre-optimizadas en WebP desde /public,
    // sin pasar por el optimizador del hosting.
    unoptimized: true,
  },
};

export default nextConfig;
