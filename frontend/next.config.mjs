/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use webpack configuration for better compatibility with pdfkit/fontkit
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize pdfkit and fontkit to avoid bundling issues with @swc/helpers
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push('pdfkit', 'fontkit');
      } else {
        config.externals = [
          config.externals,
          'pdfkit',
          'fontkit'
        ];
      }
    }
    return config;
  },
  
  // Add empty turbopack config to silence the warning when using webpack
  turbopack: {},
};

export default nextConfig;
