import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //output: "standalone",
  reactStrictMode: true,
  images: {
    domains: [
      "www.arepasguerrero.com",
      "jumbocolombiaio.vtexassets.com",
      "picsum.photos",
      "localhost",
    ],
  },
  async rewrites() {
    const backend = process.env.BACKEND_URL;
    if (!backend) return { beforeFiles: [], afterFiles: [], fallback: [] };
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/api/:path((?!auth/|payu/).*)", destination: `${backend}/:path*` },
      ],
      fallback: [],
    };
  }
};

export default nextConfig;
