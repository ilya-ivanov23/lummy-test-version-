import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true, // Игнорирует ошибки TypeScript при сборке
    },
    /* config options here */
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"images.pexels.com",
            }
        ]
    }
};

export default nextConfig;