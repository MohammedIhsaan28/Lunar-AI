/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "www.lunarai.me" }],
        destination: "https://lunarai.me/:path*",
        permanent: true,
      },
    ];
  },

  // Optional: Allow external images if needed
  images: {
    domains: ["your-cdn.com", "images.unsplash.com"], // update as needed
  },
};

export default nextConfig;
