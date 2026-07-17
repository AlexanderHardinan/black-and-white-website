// next.config.js
const { i18n } = require("./next-i18next.config");

/** @type {import("next").NextConfig} */
module.exports = {
  i18n,
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "black-and-white-website.vercel.app",
          },
        ],
        destination: "https://tcwgazette.com/:path*",
        permanent: true,
      },
    ];
  },
};