/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Keep the old Express URLs working
    return [
      { source: '/brand-strategy', destination: '/services/brand-strategy', permanent: true },
      { source: '/web-development', destination: '/services/web-development', permanent: true },
      { source: '/digital-marketing', destination: '/services/digital-marketing', permanent: true },
      { source: '/ui-ux', destination: '/services/ui-ux', permanent: true },
      { source: '/content', destination: '/services/content', permanent: true },
      { source: '/portfolio', destination: '/work', permanent: true },
      { source: '/case-studies', destination: '/work', permanent: true },
    ];
  },
};
export default nextConfig;
