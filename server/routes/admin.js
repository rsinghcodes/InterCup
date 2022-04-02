const express = require('express');

const Admin = require('../models/Admin');
const { ValidateLogin } = require('../validation/validation');
const createToken = require('../middleware/createToken');

const router = express.Router();

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
