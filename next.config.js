/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
      API_ENDPOINT: process.env.API_BASE_URL,
      API_KEY_TINY: process.env.API_KEY_TINYMCE,
    }
};

module.exports = nextConfig;
