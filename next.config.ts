import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true, // Enables React's strict mode for better debugging
//   swcMinify: true,       // Use SWC for faster builds and minification
//   productionBrowserSourceMaps: true, // Enable source maps in production for debugging

//   webpack(config, { dev }) {
//     if (dev) {
//       config.devtool = 'source-map'; // Enable detailed source maps in development
//     }

//     // Add custom path alias resolution (if necessary)
//     config.resolve = {
//       ...config.resolve,
//       alias: {
//         ...config.resolve.alias,
//         "@/": `${__dirname}/`, // Resolves the alias "@/"
//       },
//     };

//     return config;
//   },
// };

// export default nextConfig;

