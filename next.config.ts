import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // Désactive ESLint pendant les builds de production
  },
};

export default nextConfig;
