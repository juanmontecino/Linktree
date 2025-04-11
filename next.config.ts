import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "e53dh9apex.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
