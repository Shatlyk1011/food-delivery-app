/** @type {import('next').NextConfig} */
const redirects = require("./redirects");
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // HYB
  },
  async headers() {
    const headers = [];

    // Prevent search engines from indexing the site if it is not live
    // This is useful for staging environments before they are ready to go live
    // To allow robots to crawl the site, use the `NEXT_PUBLIC_IS_LIVE` env variable
    // You may want to also use this variable to conditionally render any tracking scripts
    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      });
    }

    return headers;
  },
  images: {
    domains: ["localhost", process.env.NEXT_PUBLIC_SERVER_URL]
      .filter(Boolean)
      .map((url) => url.replace(/https?:\/\//, "")),
  },
  reactStrictMode: true,
  redirects,
  swcMinify: true,
};

module.exports = withNextIntl(nextConfig);
