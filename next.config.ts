import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY, // expose the env variable
  },
};

export default nextConfig;
