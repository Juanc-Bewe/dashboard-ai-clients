// Project Configuration
const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? 'https://lindabackend.bewe.co'
    : 'http://localhost:9010',
};

export default config;