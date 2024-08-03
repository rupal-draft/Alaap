import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          publicPath: "/_next/static/media",
          outputPath: "static/media",
        },
      },
    });

    config.resolve.alias["@audio"] = path.resolve(__dirname, "public/audio");

    return config;
  },
};

export default nextConfig;
