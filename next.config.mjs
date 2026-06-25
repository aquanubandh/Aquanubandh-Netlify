/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/blog.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/shop.html',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/product-detail.html',
        destination: '/shop',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
