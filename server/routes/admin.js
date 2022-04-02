const express = require('express');

const Admin = require('../models/Admin');
const { ValidateLogin, validateSignUp } = require('../validation/validation');
const { createToken } = require('../middleware/token');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { errors, isValid } = validateSignUp(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // checks, if email already exists
    const admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
      return res.status(400).json({ email: 'Email already exists' });
    }

    const { fullname, email, password } = req.body;

    // Save mentee details
    const user = await Admin.create({
      fullname,
      email,
      password,
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

    const user = await Admin.findOne({ email });

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

module.exports = router;
