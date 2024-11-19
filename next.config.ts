import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:"cwbblzx3c5teadga.public.blob.vercel-storage.com"
      }
    ]
  }
};

export default nextConfig;
