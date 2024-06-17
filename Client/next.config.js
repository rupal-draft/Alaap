/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

    const path = require("path");
    config.resolve.alias["@audio"] = path.resolve(__dirname, "public/audio");

    return config;
  },
};

module.exports = nextConfig;
