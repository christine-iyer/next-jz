// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      
      {
        protocol: 'https',
        hostname: 'commons.wikimedia.org',
        port: '', // Use your local development port
        pathname: '/**', // Use '/**' to allow all paths under the hostname
      },

      {

        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Leave empty if no specific port is required
        pathname: '/**', // Use '**' to allow all paths under the hostname
      },
      
    ],
  },
};
