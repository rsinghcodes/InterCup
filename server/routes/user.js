const express = require('express');

const User = require('../models/User');
const { ValidateLogin, validateSignUp } = require('../validation/validation');
const { createToken } = require('../middleware/token');
const authenticatedMiddleware = require('../middleware/authenticated');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { errors, isValid } = validateSignUp(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // checks, if email already exists
    const mentee = await User.findOne({ email: req.body.email });

    if (mentee) {
      return res.status(400).json({ email: 'Email already exists' });
    }

    const { fullname, email, password, global_rank, profession, college } =
      req.body;

    // Save mentee details
    const user = await User.create({
      fullname,
      email,
      password,
      global_rank,
      profession,
      college,
    });

    const accessToken = createToken(user);

    return res.status(201).json({ accessToken });
  } catch (error) {
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
      return res.status(400).json({
        email: 'Unable to find user with that email address',
      });
    }

    if (await user.isValidPassword(password)) {
      const accessToken = createToken(user);

      return res.status(200).json({ accessToken });
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
    const profile = await User.findById(req.user.id)
      .select('-password')
      .exec();

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error',
    });
  }
});

module.exports = router;
