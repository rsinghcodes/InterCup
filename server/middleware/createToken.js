const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
    SECRET_KEY,
    {
      expiresIn: '1d',
    }
  );
};

module.exports = createToken;
