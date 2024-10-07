/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_GATEWAY_URL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
    NEXT_PUBLIC_API_IMAGE_PREDICT_URL:
      process.env.NEXT_PUBLIC_API_IMAGE_PREDICT_URL,
  },
};

export default nextConfig;
