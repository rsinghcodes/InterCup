require('dotenv').config();

module.exports = {
  MONGODB: process.env.MONGODB,
  SECRET_KEY: process.env.SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
