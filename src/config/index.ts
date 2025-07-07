// Project Configuration
const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? 'https://lindabackend.bewe.co'
    : 'https://lindabackendqa.bewe.co',
};

export default config;