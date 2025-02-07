/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "/**", // Allow all paths from this host
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    }
  }
};

export default nextConfig;
