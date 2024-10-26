/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["arabiaislamia.org", "lh3.googleusercontent.com"], // Add the domain of the external image source
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arabia-file-store.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
