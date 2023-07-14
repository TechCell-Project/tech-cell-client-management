/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
      API_ENDPOINT: process.env.API_BASE_URL,
    }
};

module.exports = nextConfig;
