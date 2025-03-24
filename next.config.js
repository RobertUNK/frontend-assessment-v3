/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
  webpack(config) {
    config.resolve.alias["@emotion/styled"] = "@mui/styled-engine-sc";
    return config;
  },
};

module.exports = nextConfig;
