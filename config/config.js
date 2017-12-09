// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  mongooseDebug: process.env.MONGOOSE_DEBUG || false,
  jwtSecret: process.env.JWT_SECRET || '123456789101112131415',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/cpb-react-api'
};

export default config;
