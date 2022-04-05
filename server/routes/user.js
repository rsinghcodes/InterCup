const express = require('express');
const crypto = require('crypto');

const User = require('../models/User');
const Token = require('../models/Token');
const { validateSignUp, ValidateLogin } = require('../validation/validation');
const sendEmail = require('../utils/sendEmail');
const authenticatedMiddleware = require('../middleware/authenticated');
const { BASE_URL } = require('../config');
const { createToken } = require('../middleware/token');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { errors, isValid } = validateSignUp(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // checks, if email already exists
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    }

    const { fullname, email, password, global_rank, profession, college } =
      req.body;

    // Save mentee details
    user = await User.create({
      fullname,
      email,
      password,
      global_rank,
      profession,
      college,
    });

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();

    const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;

    await sendEmail(user.email, 'Verify Email', url);

    return res
      .status(201)
      .json({ message: 'An Email sent to your account please verify' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Server Error',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { errors, isValid } = ValidateLogin(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        email: 'Unable to find user with that email address',
      });
    }

    if (await user.isValidPassword(password)) {
      if (!user.isVerified) {
        let token = await Token.findOne({ userId: user._id });

        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
          }).save();

          const url = `${BASE_URL}users/${user.id}/verify/${token.token}`;

          await sendEmail(user.email, 'Verify Email', url);
        } else {
          return res
            .status(400)
            .json({ message: 'An Email sent to your account please verify' });
        }
      } else {
        const accessToken = createToken(user);

        return res.status(200).json({ accessToken });
      }
    } else {
      return res.status(400).json({ password: 'Password is incorrect' });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error',
    });
  }
});

router.get('/profile', authenticatedMiddleware, async (req, res) => {
  try {
    const profile = await User.findById(req.user.id).select('-password').exec();

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error',
    });
  }
});

module.exports = router;
