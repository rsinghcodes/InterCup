const jwt = require('jsonwebtoken');

const { verifyToken } = require('./token');

const Admin = require('../models/Admin');
const Mentor = require('../models/Mentor');
const Mentee = require('../models/Mentee');

async function authenticatedMiddleware(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Unauthorised' });
  }

  const accessToken = bearer.split('Bearer ')[1].trim();
  try {
    const payload = await verifyToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) {
      return res.status(403).send({ message: 'Unauthorised' });
    }

    const user =
      (await Admin.findById(payload.id).select('-password').exec()) ||
      (await Mentor.findById(payload.id).select('-password').exec()) ||
      (await Mentee.findById(payload.id).select('-password').exec());

    if (!user) {
      return res.status(403).send({ message: 'Unauthorised' });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = authenticatedMiddleware;
