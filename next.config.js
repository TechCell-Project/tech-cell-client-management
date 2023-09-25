/** @type {import('next').NextConfig} */
const path = require("path");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    API_ENDPOINT: process.env.API_BASE_URL,
    API_KEY_TINY: process.env.API_KEY_TINYMCE,
  },
  experimental: {
    appDir: true,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '{{#if (eq member "useTheme")}}@components/Theme/useTheme{{else}}@mui/material/{{member}}{{/if}}',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  esmExternals: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  // Config Self-hosted Tiny MCE 
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.plugins.push(
  //     new CopyPlugin({
  //       patterns: [
  //         {
  //           from: path.join(__dirname, "node_modules/tinymce"),
  //           to: path.join(__dirname, "public/assets/libs/tinymce"),
  //         },
  //       ],
  //     })
  //   );
  //   return config;
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
