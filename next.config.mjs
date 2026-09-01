/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/SiteOps360' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/SiteOps360/' : '',
};
export default nextConfig;
