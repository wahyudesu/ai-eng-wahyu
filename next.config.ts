import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [25, 50],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "karpathy.ai",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "phoenix.arize.com",
      },
      {
        protocol: "https",
        hostname: "braintrust.dev",
      },
      {
        protocol: "https",
        hostname: "flowiseai.com",
      },
      {
        protocol: "https",
        hostname: "langflow.org",
      },
    ],
  },
};

export default nextConfig;
